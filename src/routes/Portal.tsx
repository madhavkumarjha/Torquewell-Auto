import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import {
  PORTAL_CLIENT,
  INITIAL_APPROVALS,
  PORTAL_LOGBOOK,
  PORTAL_INVOICES,
  PORTAL_REMINDERS,
  FLEET_VEHICLES,
  PORTAL_MESSAGES,
  PortalApprovalItem,
  PortalInvoice,
  PortalMessage
} from '@/data/portal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { RiskAcknowledgementModal } from '@/components/portal/RiskAcknowledgementModal';
import { InvoicePdfModal } from '@/components/portal/InvoicePdfModal';
import { formatDistance } from '@/lib/units';

type PortalTab = 'overview' | 'logbook' | 'approvals' | 'invoices' | 'reminders' | 'fleet' | 'messages';

export default function Portal() {
  const { locale, units } = usePrefsStore();
  const [activeTab, setActiveTab] = useState<PortalTab>('overview');
  const [approvals, setApprovals] = useState<PortalApprovalItem[]>(INITIAL_APPROVALS);
  const [decliningItem, setDecliningItem] = useState<PortalApprovalItem | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<PortalInvoice | null>(null);
  const [messages, setMessages] = useState<PortalMessage[]>(PORTAL_MESSAGES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApprove = (item: PortalApprovalItem) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, status: 'approved' } : a))
    );
    showToast(
      locale === 'hi'
        ? `स्वीकृति दर्ज की गई: ${item.title[locale]} पर काम शुरू हो रहा है!`
        : `Approval authorized for ${item.title[locale]}! Work initiated on Bay 04.`
    );
  };

  const handleDeclineConfirmed = (item: PortalApprovalItem, _reason: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, status: 'declined' } : a))
    );
    showToast(
      locale === 'hi'
        ? `कार्य स्थगित: ${item.title[locale]}। सुरक्षा पावती सुरक्षित की गई।`
        : `Work declined: ${item.title[locale]}. Risk acknowledgement logged to audit dossier.`
    );
  };

  const handleSendCannedMessage = (textEn: string, textHi: string) => {
    const newMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      senderName: PORTAL_CLIENT.name,
      timestamp: 'Just now',
      content: { en: textEn, hi: textHi }
    };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const replyMsg: PortalMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'technician',
        senderName: 'Tomas Hale (Master Tech #01)',
        timestamp: 'Just now',
        content: {
          en: 'Message received Sam. Noted on the job card and updated on Bay 04 tracking.',
          hi: 'संदेश प्राप्त हुआ सैम। जॉब कार्ड पर नोट कर दिया गया है।'
        }
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8" role="region" aria-label="Customer Garage Portal">
      {/* Toast Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-primary-foreground/20 text-xs font-semibold"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Client Header & Active Vehicle Strip */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              CLIENT PORTAL · {PORTAL_CLIENT.name.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-muted-foreground">ID: #TW-8842</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3 flex-wrap">
            <span>{PORTAL_CLIENT.vehicle.model}</span>
            <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-muted border border-border">
              {PORTAL_CLIENT.vehicle.regPlate}
            </span>
          </h1>
          <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>VIN: <strong className="font-mono text-foreground">{PORTAL_CLIENT.vehicle.vin}</strong></span>
            <span>Odometer: <strong className="font-mono text-foreground">{formatDistance(PORTAL_CLIENT.vehicle.currentMileageKm, units)}</strong></span>
            <span>Warranty: <strong className="text-emerald-500">Active (12M Covered)</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/journey">
            <Button variant="outline" size="sm" className="text-xs" id="track-live-bay-btn">
              📡 {locale === 'hi' ? 'लाइव बे बोर्ड ट्रैक करें' : 'Track on Live Bay Board'}
            </Button>
          </Link>
          <Link to="/book">
            <Button variant="primary" size="sm" className="text-xs" id="portal-book-visit-btn">
              📅 {locale === 'hi' ? 'सर्विस बुक करें' : 'Book Workshop Visit'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Pending Approval Notice Banner (if any) */}
      {pendingApprovalsCount > 0 && activeTab !== 'approvals' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">⚠️</span>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {locale === 'hi' ? 'ग्राहक अनुमोदन आवश्यक' : 'Action Required: Pending Inspection Approval'}
              </div>
              <div className="text-xs text-foreground font-medium">
                {locale === 'hi'
                  ? `आपके पास ${pendingApprovalsCount} लंबित पुर्जा निर्णय हैं। काम आगे बढ़ाने हेतु निर्णय लें।`
                  : `You have ${pendingApprovalsCount} pending item decisions waiting for digital sign-off.`}
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setActiveTab('approvals')}
            className="text-xs font-bold"
          >
            {locale === 'hi' ? 'अनुमोदन देखें' : 'Review Approvals'} &rarr;
          </Button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-border/40 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'overview' as PortalTab, label: locale === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: '📊' },
          { id: 'logbook' as PortalTab, label: locale === 'hi' ? 'डिजिटल लॉगबुक' : 'Service Logbook', icon: '📖' },
          {
            id: 'approvals' as PortalTab,
            label: locale === 'hi' ? `अनुमोदन (${pendingApprovalsCount})` : `Approvals (${pendingApprovalsCount})`,
            icon: '✍️'
          },
          { id: 'invoices' as PortalTab, label: locale === 'hi' ? 'चालान व बिल' : 'Invoices', icon: '🧾' },
          { id: 'reminders' as PortalTab, label: locale === 'hi' ? 'रिमाइंडर' : 'Reminders', icon: '⏰' },
          { id: 'fleet' as PortalTab, label: locale === 'hi' ? 'फ्लीट प्रबंधन' : 'Business Fleet', icon: '🚛' },
          { id: 'messages' as PortalTab, label: locale === 'hi' ? 'तकनीशियन चैट' : 'Messages', icon: '💬' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Dashboard Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Vehicle Health</span>
              <div className="text-2xl font-black text-emerald-500">92% OK</div>
              <div className="text-[11px] text-muted-foreground">30 of 32 checkpoints passed</div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Next Service Due</span>
              <div className="text-2xl font-black text-foreground">52,000 km</div>
              <div className="text-[11px] text-muted-foreground">~3,750 km or 45 days remaining</div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Warranty Status</span>
              <div className="text-2xl font-black text-primary">Covered</div>
              <div className="text-[11px] text-muted-foreground">Valid through Oct 2026</div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Active Bay Status</span>
              <div className="text-2xl font-black text-amber-500">Stage 05</div>
              <div className="text-[11px] text-muted-foreground">Bay 04 · Customer Approval</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Proof Report Preview */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-bold text-base text-foreground">Latest Digital Proof Report</h3>
                <Link to="/proof">
                  <span className="text-xs text-primary font-medium hover:underline">View Full &rarr;</span>
                </Link>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span>Inspection Date: 2026-09-18</span>
                  <span className="text-primary">Bay 04 · Tomas Hale</span>
                </div>
                <p className="text-foreground leading-relaxed">
                  Front brake friction lining measured at 2.1 mm (urgent). Discs are healthy at 21.8 mm. Brake fluid moisture is 2.8% (watch).
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Badge variant="now">1 Urgency: NOW</Badge>
                  <Badge variant="soon">1 Urgency: SOON</Badge>
                  <Badge variant="ok">30 Pass</Badge>
                </div>
              </div>
            </Card>

            {/* Quick Reminders */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-bold text-base text-foreground">Upcoming Reminders</h3>
                <button onClick={() => setActiveTab('reminders')} className="text-xs text-primary font-medium hover:underline">
                  All Reminders &rarr;
                </button>
              </div>
              <div className="space-y-2.5">
                {PORTAL_REMINDERS.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-foreground">{r.title[locale]}</div>
                      <div className="text-[11px] text-muted-foreground">{r.dueText[locale]}</div>
                    </div>
                    <Link to="/book">
                      <Button variant="outline" size="sm" className="text-xs">
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: Service Logbook Timeline */}
      {activeTab === 'logbook' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'डिजिटल सर्विस इतिहास एवं साक्ष्य' : 'Verified Service History Logbook'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Every completed workshop visit is permanently archived with micrometer measurements, technician torque certification, and VAT invoice records.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8 space-y-8">
            {PORTAL_LOGBOOK.map((entry) => (
              <div key={entry.id} className="relative space-y-3">
                {/* Timeline node */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold flex items-center justify-center shadow">
                  ✓
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-base text-foreground">{entry.serviceTitle[locale]}</h3>
                    <div className="text-xs text-muted-foreground">
                      {entry.date} · {entry.branchName} · Lead: <strong className="text-foreground">{entry.technicianName}</strong>
                    </div>
                  </div>
                  <div className="font-mono text-xs font-bold text-primary">
                    {formatDistance(entry.mileageKm, units)}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {entry.summary[locale]}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {entry.evidenceTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-muted border border-border text-foreground font-mono"
                    >
                      🛡️ {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      const inv = PORTAL_INVOICES.find((i) => i.id === entry.invoiceId);
                      if (inv) setSelectedInvoice(inv);
                    }}
                    className="text-xs text-primary font-semibold hover:underline ml-2"
                  >
                    View Invoice {entry.invoiceId} &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: Pending Approvals (Interactive Mock) */}
      {activeTab === 'approvals' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'लंबित कार्य अनुमोदन' : 'Pending Repair Authorisations'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              You are in full control. Authorise or decline individual line items with 1-click consent. No work begins without your prior written agreement.
            </p>
          </div>

          <div className="space-y-4">
            {approvals.map((item) => {
              const isApproved = item.status === 'approved';
              const isDeclined = item.status === 'declined';

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isApproved
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : isDeclined
                      ? 'border-destructive/40 bg-destructive/5 opacity-70'
                      : 'border-border/80 bg-card shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.urgency === 'now' ? 'now' : 'soon'}>
                        {item.urgency.toUpperCase()}
                      </Badge>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {item.system}
                      </span>
                    </div>

                    <div className="font-mono text-base font-extrabold text-foreground">
                      £{item.cost.toFixed(2)}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-foreground mb-1">
                    {item.title[locale]}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.why[locale]}
                  </p>

                  {/* Actions / Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/40 flex-wrap gap-2">
                    {isApproved ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        ✓ Authorized & Dispatched to Bay 04
                      </span>
                    ) : isDeclined ? (
                      <span className="text-xs font-bold text-destructive flex items-center gap-1.5">
                        ✕ Declined by Client (Safety Risk Acknowledged)
                      </span>
                    ) : (
                      <>
                        <Link to="/proof">
                          <span className="text-xs text-primary font-medium hover:underline">
                            Inspect Proof Photos &rarr;
                          </span>
                        </Link>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDecliningItem(item)}
                            className="text-xs text-destructive hover:bg-destructive/10"
                          >
                            Decline Work
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleApprove(item)}
                            className="text-xs font-bold"
                          >
                            ✓ Authorise (£{item.cost})
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* TAB 4: Invoices */}
      {activeTab === 'invoices' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'वैट चालान एवं भुगतान रसीदें' : 'Official Itemised VAT Invoices'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Download complete PDF VAT receipts for tax reporting, expense reimbursement, or vehicle resale provenance.
            </p>
          </div>

          <div className="space-y-3">
            {PORTAL_INVOICES.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-xl border border-border/70 bg-card hover:border-primary/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{inv.id}</span>
                    <span className="text-xs text-muted-foreground">· {inv.date}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold uppercase">
                      {inv.paymentStatus}
                    </span>
                  </div>
                  <div className="text-xs text-foreground font-semibold mt-1">
                    {inv.branchName} · {inv.vehicleModel} ({inv.regPlate})
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Warranty: {inv.warrantyMonths} Months Nationwide Parts & Labour
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="font-mono text-base font-extrabold text-foreground">
                    £{inv.grandTotal.toFixed(2)}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedInvoice(inv)}
                    className="text-xs"
                  >
                    📄 {locale === 'hi' ? 'PDF चालान देखें' : 'View PDF'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: Reminders */}
      {activeTab === 'reminders' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'सर्विस एवं एमओटी रिमाइंडर' : 'Preventative Service Reminders'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Synchronized with your vehicle odometer and calendar intervals. Zero unexpected MOT lapses.
            </p>
          </div>

          <div className="space-y-4">
            {PORTAL_REMINDERS.map((rem) => (
              <div
                key={rem.id}
                className="p-5 rounded-2xl border border-border/70 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={rem.urgency}>
                      {rem.urgency.toUpperCase()}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground capitalize">
                      {rem.type} Interval
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-foreground">{rem.title[locale]}</h3>
                  <div className="text-xs text-primary font-medium">{rem.dueText[locale]}</div>
                </div>

                <Link to="/book">
                  <Button variant="primary" size="sm" className="text-xs">
                    📅 Schedule This Service
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 6: Business Fleet Management */}
      {activeTab === 'fleet' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10">
                APEX LOGISTICS UK · FLEET PORTAL
              </span>
              <h2 className="text-2xl font-bold tracking-tight mt-1">
                Commercial Fleet Telemetry & Uptime
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Live monitoring for your 4 assigned commercial vans and staff pool vehicles.
              </p>
            </div>

            <Link to="/contact">
              <Button variant="outline" size="sm" className="text-xs">
                📞 Contact Fleet Account Manager
              </Button>
            </Link>
          </div>

          {/* Fleet KPI strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="text-xs text-muted-foreground font-semibold">Active Fleet Uptime</div>
              <div className="text-2xl font-black text-emerald-500">97.8%</div>
              <div className="text-[11px] text-muted-foreground">Average downtime: 0.8 days/quarter</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="text-xs text-muted-foreground font-semibold">Vehicles In-Shop Today</div>
              <div className="text-2xl font-black text-amber-500">1 Vehicle</div>
              <div className="text-[11px] text-muted-foreground">TW72 FLT on Bay 01 (Est: 16:30)</div>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="text-xs text-muted-foreground font-semibold">Scheduled Next 30 Days</div>
              <div className="text-2xl font-black text-primary">1 Service</div>
              <div className="text-[11px] text-muted-foreground">TQ21 NXR due in 2,600 km</div>
            </div>
          </div>

          {/* Fleet Vehicles Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-border/60 text-xs">
              <thead>
                <tr className="bg-muted/50 border-b border-border/60">
                  <th className="p-3 font-bold text-foreground">Reg / Vehicle</th>
                  <th className="p-3 font-bold text-foreground">Status</th>
                  <th className="p-3 font-bold text-foreground">Odometer</th>
                  <th className="p-3 font-bold text-foreground">Next Service Due</th>
                  <th className="p-3 font-bold text-foreground">Driver / Notes</th>
                  <th className="p-3 font-bold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {FLEET_VEHICLES.map((v) => (
                  <tr key={v.id} className="hover:bg-muted/20">
                    <td className="p-3">
                      <div className="font-mono font-bold text-primary">{v.regPlate}</div>
                      <div className="text-[11px] text-muted-foreground">{v.label}</div>
                    </td>
                    <td className="p-3 font-mono font-bold">
                      {v.status === 'ok' && <Badge variant="ok">OK (ACTIVE)</Badge>}
                      {v.status === 'due' && <Badge variant="soon">SERVICE DUE</Badge>}
                      {v.status === 'in-shop' && <Badge variant="now">IN BAY 01</Badge>}
                    </td>
                    <td className="p-3 font-mono">
                      {formatDistance(v.currentKm, units)}
                    </td>
                    <td className="p-3 font-mono">
                      <div>{formatDistance(v.nextDueKm, units)}</div>
                      <div className="text-[10px] text-muted-foreground">{v.nextDueDate}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-foreground">{v.assignedDriver}</div>
                      {v.recentDefect && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
                          ⚠️ {v.recentDefect[locale]}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link to="/book">
                        <Button size="sm" variant="outline" className="text-[11px]">
                          Book Bay
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 7: Live Technician Messages */}
      {activeTab === 'messages' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="border-b border-border/40 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {locale === 'hi' ? 'कार्यशाला संदेश एवं तकनीशियन चैट' : 'Technician Direct Communication Thread'}
              </h2>
              <div className="text-xs text-muted-foreground mt-0.5">
                Active Lead: <strong className="text-foreground">Tomas Hale (Master Tech #01)</strong> · Bay 04
              </div>
            </div>
            <Badge variant="ok" className="text-xs">
              Live Link
            </Badge>
          </div>

          {/* Conversation Stream */}
          <div className="space-y-3 max-h-[420px] overflow-y-auto p-4 rounded-xl bg-muted/20 border border-border/60">
            {messages.map((msg) => {
              const isCust = msg.sender === 'customer';
              const isSys = msg.sender === 'system';

              if (isSys) {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                      📡 {msg.content[locale]} · {msg.timestamp}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCust ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] font-mono text-muted-foreground mb-1 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                      isCust
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-card border border-border text-foreground rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.content[locale]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canned Quick Reply Triggers */}
          <div className="space-y-2 pt-2 border-t border-border/40">
            <div className="text-xs font-semibold text-muted-foreground">
              {locale === 'hi' ? 'त्वरित प्रतिक्रियाएं:' : 'Quick Canned Responses:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  en: 'Thanks Tomas, please proceed with the front brake pad replacement.',
                  hi: 'धन्यवाद टॉमस, कृपया फ्रंट ब्रेक पैड बदलने का काम शुरू करें।'
                },
                {
                  en: 'Please retain the old worn brake pads in the return box for me.',
                  hi: 'कृपया पुराने बदले गए ब्रेक पैड मेरे देखने के लिए रख लें।'
                },
                {
                  en: 'What is the estimated collection time this afternoon?',
                  hi: 'आज दोपहर गाड़ी संग्रह का अनुमानित समय क्या रहेगा?'
                }
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendCannedMessage(btn.en, btn.hi)}
                  className="px-3 py-1.5 rounded-lg border border-border/80 bg-card hover:bg-muted/60 text-foreground text-xs text-left transition-colors"
                >
                  💬 {btn[locale]}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Risk Acknowledgement Modal (Declining safety-critical items) */}
      <RiskAcknowledgementModal
        isOpen={!!decliningItem}
        onClose={() => setDecliningItem(null)}
        onConfirmDecline={handleDeclineConfirmed}
        item={decliningItem}
        locale={locale}
      />

      {/* Invoice PDF Modal */}
      <InvoicePdfModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
        locale={locale}
      />
    </div>
  );
}
