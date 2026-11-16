const fs = require('fs');
let html = fs.readFileSync('C:/Users/Ahmad/.gemini/antigravity/scratch/wateerah/index.html', 'utf8');

// Find the start marker
const startMarker = '    // =========================================================================\n    // THE OFFICIAL A4 PRINT DOCUMENT COMPONENT (CLEAN EXECUTIVE STYLING FOR A4)\n    // =========================================================================';
const endMarker = '    // =========================================================================\n    // SUB-VIEW: DEVICES MANAGEMENT\n    // =========================================================================';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1) { console.error('Start marker not found'); process.exit(1); }
if (endIdx === -1) { console.error('End marker not found'); process.exit(1); }

console.log('Start:', startIdx, 'End:', endIdx);

const beforeA4 = html.slice(0, startIdx);
const afterA4 = html.slice(endIdx);

const newA4Component = `    // =========================================================================
    // THE OFFICIAL A4 PRINT DOCUMENT — PROFESSIONAL SAUDI GOVERNMENT STANDARD
    // =========================================================================
    function OfficialA4DocumentContent({
      appName,
      facility,
      billDetails,
      ecoImpact,
      latestReading,
      customerName,
      onCustomerNameChange,
      technicianName,
      technicianTitle
    }) {
      const todayDate = formatSaudiDate();
      const reportNumber = 'KSA-AUD-' + Math.floor(100000 + Math.random() * 900000);

      return (
        <div className="print-page text-gray-950" dir="rtl" style={{fontFamily:'Alyamama, sans-serif', fontSize:'9pt', lineHeight:'1.4'}}>

          {/* ═══ HEADER STRIP — Saudi Green + White ═══ */}
          <div style={{background:'#1a5c38', color:'#fff', padding:'9px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <div style={{fontSize:'20px'}}>🇸🇦</div>
              <div>
                <div style={{fontWeight:'900', fontSize:'11pt', letterSpacing:'0.4px'}}>المملكة العربية السعودية</div>
                <div style={{fontSize:'7pt', opacity:'0.85', fontWeight:'600'}}>وزارة الطاقة — البرنامج الوطني لكفاءة الطاقة (NEEP) | WERA</div>
              </div>
            </div>
            <div style={{textAlign:'left', fontSize:'7pt', opacity:'0.9', direction:'ltr', fontFamily:'IBM Plex Sans, sans-serif'}}>
              <div style={{fontWeight:'900', fontSize:'7.5pt'}}>NO: {reportNumber}</div>
              <div>{new Date().toLocaleDateString('en-GB')}</div>
              <div style={{background:'rgba(255,255,255,0.22)', padding:'1px 6px', borderRadius:'3px', marginTop:'2px', fontSize:'6.5pt', fontWeight:'900', letterSpacing:'0.5px'}}>SASO / WERA CERTIFIED</div>
            </div>
          </div>

          {/* ═══ DOCUMENT TITLE BAND ═══ */}
          <div style={{background:'#f0f7f3', borderBottom:'2.5px solid #1a5c38', borderTop:'none', padding:'7px 14px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <h1 style={{fontSize:'12.5pt', fontWeight:'900', color:'#111827', margin:'0 0 1px 0', letterSpacing:'0.3px'}}>
                تقرير التدقيق الفني لكفاءة الطاقة والاستهلاك
              </h1>
              <p style={{fontSize:'7pt', color:'#374151', margin:'0', fontWeight:'600'}}>
                صادر ومعتمد عبر منصة {appName} | نظام إدارة الطاقة والاستدامة البيئية — المملكة العربية السعودية
              </p>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'5px', flexShrink:'0'}}>
              <svg viewBox="0 0 1124.14 1256.39" width="20" height="20" style={{fill:'#1a5c38', display:'block'}}>
                <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
                <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
              </svg>
              <span style={{fontWeight:'900', fontSize:'11.5pt', color:'#1a5c38'}}>كِفَاءَة</span>
            </div>
          </div>

          {/* ═══ SECTION A: FACILITY METADATA ═══ */}
          <div style={{padding:'6px 14px', borderBottom:'1px solid #d1d5db', background:'#fafafa'}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px', fontSize:'7.5pt'}}>
              <div>
                <div style={{color:'#6b7280', fontWeight:'700', fontSize:'6.5pt', textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:'1px'}}>اسم المنشأة</div>
                <div style={{fontWeight:'900', color:'#111827', fontSize:'8pt'}}>{facility.name}</div>
              </div>
              <div>
                <div style={{color:'#6b7280', fontWeight:'700', fontSize:'6.5pt', textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:'1px'}}>مسؤول المنشأة (العميل)</div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => onCustomerNameChange(e.target.value)}
                  placeholder="اسم العميل..."
                  style={{background:'transparent', border:'none', borderBottom:'1.5px dashed #9ca3af', fontWeight:'900', fontSize:'8pt', color:'#111827', outline:'none', width:'100%', padding:'1px 0', fontFamily:'Alyamama, sans-serif'}}
                />
              </div>
              <div>
                <div style={{color:'#6b7280', fontWeight:'700', fontSize:'6.5pt', textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:'1px'}}>نظام التعريفة المعتمد</div>
                <div style={{fontWeight:'700', color:'#111827', fontSize:'7.5pt'}}>{facility.tariffMode === 'commercial' ? 'تجاري (0.26)' : 'سكني (0.18/0.30)'}</div>
              </div>
              <div>
                <div style={{color:'#6b7280', fontWeight:'700', fontSize:'6.5pt', textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:'1px'}}>الحمل اللحظي المقاس</div>
                <div style={{fontWeight:'900', color:'#1a5c38', fontFamily:'IBM Plex Sans, sans-serif', fontSize:'8pt'}}>{formatNumber(latestReading.watts)} W</div>
              </div>
            </div>
          </div>

          {/* ═══ SECTION B: DEVICE INVENTORY TABLE ═══ */}
          <div style={{padding:'6px 14px 4px', borderBottom:'1px solid #d1d5db'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px'}}>
              <h3 style={{fontSize:'8pt', fontWeight:'900', color:'#1a5c38', margin:'0', textTransform:'uppercase', letterSpacing:'0.4px'}}>
                ① بيان وجرد الأحمال الكهربائية بالمنشأة
              </h3>
              <span style={{fontSize:'6.5pt', color:'#6b7280', fontFamily:'IBM Plex Sans, sans-serif'}}>
                إجمالي: {formatNumber(facility.devices?.length || 0)} جهاز
              </span>
            </div>
            <table style={{width:'100%', borderCollapse:'collapse', fontSize:'7pt', direction:'rtl'}}>
              <thead>
                <tr style={{background:'#1a5c38', color:'#fff', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'right'}}>الجهاز / الحمل الكهربائي</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'right'}}>القسم / المنطقة</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'center', fontFamily:'IBM Plex Sans, sans-serif'}}>W</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'center', fontFamily:'IBM Plex Sans, sans-serif'}}>العدد</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'center', fontFamily:'IBM Plex Sans, sans-serif'}}>س/يوم</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'center', fontFamily:'IBM Plex Sans, sans-serif'}}>يوم/شهر</th>
                  <th style={{padding:'3px 5px', fontWeight:'700', textAlign:'center', fontFamily:'IBM Plex Sans, sans-serif'}}>kWh/شهر</th>
                </tr>
              </thead>
              <tbody>
                {(facility.devices || []).map((d, i) => {
                  const kwh = (d.wattage * d.quantity * d.hoursPerDay * d.daysPerMonth) / 1000;
                  return (
                    <tr key={d.id} style={{background: i % 2 === 1 ? '#f9fafb' : '#fff', borderBottom:'0.5px solid #e5e7eb'}}>
                      <td style={{padding:'2.5px 5px', fontWeight:'600', color:'#111827'}}>{d.name}</td>
                      <td style={{padding:'2.5px 5px', color:'#374151'}}>{d.room}</td>
                      <td style={{padding:'2.5px 5px', textAlign:'center', color:'#111827', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(d.wattage)}</td>
                      <td style={{padding:'2.5px 5px', textAlign:'center', color:'#111827', fontFamily:'IBM Plex Sans, sans-serif'}}>x{formatNumber(d.quantity)}</td>
                      <td style={{padding:'2.5px 5px', textAlign:'center', color:'#111827', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(d.hoursPerDay,1)}</td>
                      <td style={{padding:'2.5px 5px', textAlign:'center', color:'#111827', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(d.daysPerMonth)}</td>
                      <td style={{padding:'2.5px 5px', textAlign:'center', fontWeight:'700', color:'#1a5c38', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(kwh,0)}</td>
                    </tr>
                  );
                })}
                <tr style={{background:'#e8f5ed', borderTop:'1.5px solid #1a5c38', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
                  <td colSpan={6} style={{padding:'3px 5px', fontWeight:'900', textAlign:'right', color:'#1a5c38', fontSize:'7.5pt'}}>الإجمالي الشهري للاستهلاك الكهربائي</td>
                  <td style={{padding:'3px 5px', textAlign:'center', fontWeight:'900', color:'#1a5c38', fontSize:'8pt', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.tier1Kwh + billDetails.tier2Kwh, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ═══ SECTION C: BILL + ENVIRONMENT (2 columns) ═══ */}
          <div style={{padding:'6px 14px 5px', borderBottom:'1px solid #d1d5db', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>

            {/* Bill Breakdown */}
            <div>
              <h3 style={{fontSize:'8pt', fontWeight:'900', color:'#1a5c38', margin:'0 0 4px 0', textTransform:'uppercase', letterSpacing:'0.4px'}}>
                ② احتساب الفاتورة الشهرية الرسمية
              </h3>
              <table style={{width:'100%', fontSize:'7pt', borderCollapse:'collapse'}}>
                <tbody>
                  {!billDetails.isCommercial && (
                    <tr style={{borderBottom:'0.5px solid #e5e7eb'}}>
                      <td style={{padding:'2px 3px', color:'#374151'}}>الشريحة الأولى (حتى 6,000 kWh × 0.18)</td>
                      <td style={{padding:'2px 3px', textAlign:'left', fontWeight:'700', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.tier1Cost, 2)}</td>
                    </tr>
                  )}
                  {billDetails.tier2Cost > 0 && (
                    <tr style={{borderBottom:'0.5px solid #e5e7eb'}}>
                      <td style={{padding:'2px 3px', color:'#374151'}}>الشريحة الثانية (فائض × 0.30)</td>
                      <td style={{padding:'2px 3px', textAlign:'left', fontWeight:'700', color:'#991b1b', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.tier2Cost, 2)}</td>
                    </tr>
                  )}
                  {billDetails.isCommercial && (
                    <tr style={{borderBottom:'0.5px solid #e5e7eb'}}>
                      <td style={{padding:'2px 3px', color:'#374151'}}>تعريفة تجارية موحدة (0.26 / kWh)</td>
                      <td style={{padding:'2px 3px', textAlign:'left', fontWeight:'700', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.energyCost, 2)}</td>
                    </tr>
                  )}
                  <tr style={{borderBottom:'0.5px solid #e5e7eb'}}>
                    <td style={{padding:'2px 3px', color:'#374151'}}>رسوم العداد الشهرية المعتمدة</td>
                    <td style={{padding:'2px 3px', textAlign:'left', fontWeight:'700', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.meter, 2)}</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid #d1d5db'}}>
                    <td style={{padding:'2px 3px', color:'#6b7280'}}>ضريبة القيمة المضافة (VAT 15%)</td>
                    <td style={{padding:'2px 3px', textAlign:'left', fontWeight:'700', color:'#6b7280', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.vat, 2)}</td>
                  </tr>
                  <tr style={{background:'#1a5c38', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
                    <td style={{padding:'4px 5px', fontWeight:'900', color:'#fff', fontSize:'8pt'}}>الإجمالي الشهري المستحق</td>
                    <td style={{padding:'4px 5px', textAlign:'left', fontWeight:'900', color:'#fff', fontSize:'9.5pt'}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:'3px'}}>
                        <svg viewBox="0 0 1124.14 1256.39" width="11" height="11" style={{fill:'#fff', display:'inline-block', verticalAlign:'middle', flexShrink:0}}>
                          <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
                          <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
                        </svg>
                        <span style={{fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(billDetails.grandTotal, 2)}</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Environmental Certificate */}
            <div>
              <h3 style={{fontSize:'8pt', fontWeight:'900', color:'#1a5c38', margin:'0 0 4px 0', textTransform:'uppercase', letterSpacing:'0.4px'}}>
                ③ شهادة الأثر البيئي (السعودية الخضراء)
              </h3>
              <div style={{background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'6px', padding:'6px 8px', fontSize:'7pt', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', marginBottom:'5px'}}>
                  <div style={{background:'#dcfce7', borderRadius:'4px', padding:'4px 6px'}}>
                    <div style={{color:'#166534', fontSize:'6pt', fontWeight:'700', textTransform:'uppercase'}}>الكربون الموفر</div>
                    <div style={{fontWeight:'900', color:'#166534', fontSize:'9.5pt', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(ecoImpact.savedCarbonKg)} <span style={{fontSize:'6.5pt', fontFamily:'Alyamama, sans-serif'}}>كجم CO₂</span></div>
                  </div>
                  <div style={{background:'#dcfce7', borderRadius:'4px', padding:'4px 6px'}}>
                    <div style={{color:'#166534', fontSize:'6pt', fontWeight:'700', textTransform:'uppercase'}}>يعادل غرس</div>
                    <div style={{fontWeight:'900', color:'#166534', fontSize:'9.5pt', fontFamily:'IBM Plex Sans, sans-serif'}}>🌲 {formatNumber(ecoImpact.treesEquivalent, 1)} <span style={{fontSize:'6.5pt', fontFamily:'Alyamama, sans-serif'}}>شجرة</span></div>
                  </div>
                  <div style={{background:'#dcfce7', borderRadius:'4px', padding:'4px 6px'}}>
                    <div style={{color:'#166534', fontSize:'6pt', fontWeight:'700', textTransform:'uppercase'}}>درجة الكفاءة</div>
                    <div style={{fontWeight:'900', color:'#166534', fontSize:'9.5pt', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(ecoImpact.efficiencyScore)}%</div>
                  </div>
                  <div style={{background:'#dcfce7', borderRadius:'4px', padding:'4px 6px'}}>
                    <div style={{color:'#166534', fontSize:'6pt', fontWeight:'700', textTransform:'uppercase'}}>الأثر السنوي</div>
                    <div style={{fontWeight:'900', color:'#166534', fontSize:'8pt', fontFamily:'IBM Plex Sans, sans-serif'}}>{formatNumber(ecoImpact.annualTreesEquivalent)} <span style={{fontSize:'6.5pt', fontFamily:'Alyamama, sans-serif'}}>شجرة/سنة</span></div>
                  </div>
                </div>
                <p style={{margin:'0', fontSize:'6.5pt', color:'#374151', lineHeight:'1.4', borderTop:'0.5px solid #bbf7d0', paddingTop:'4px'}}>
                  تثبت هذه الشهادة مساهمة المنشأة في مبادرة «السعودية الخضراء» وأهداف الحياد الصفري 2060.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ ESTIMATE DISCLAIMER ═══ */}
          <div style={{background:'#eff6ff', borderBottom:'1px solid #bfdbfe', padding:'4px 14px', fontSize:'7pt', fontWeight:'700', color:'#1e3a8a', printColorAdjust:'exact', WebkitPrintColorAdjust:'exact'}}>
            هذا تقرير تقديري لأغراض العرض، ولا يعد فاتورة فعلية أو وثيقة معتمدة من جهة حكومية.
          </div>

          {/* ═══ SIGNATURES + OFFICIAL STAMP ═══ */}
          <div style={{padding:'8px 14px 6px', display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>

            {/* Technician Block */}
            <div style={{textAlign:'center', width:'185px'}}>
              <div style={{fontSize:'7.5pt', fontWeight:'900', color:'#111827'}}>{technicianName}</div>
              <div style={{fontSize:'6pt', color:'#6b7280', marginTop:'1px', lineHeight:'1.3'}}>{technicianTitle}</div>
              <svg viewBox="0 0 160 50" fill="none" style={{width:'130px', height:'38px', margin:'4px auto', display:'block'}}>
                <path d="M15 35C30 15 50 12 70 20C90 28 85 45 65 42C45 39 40 20 60 15C80 10 110 15 145 25" stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 28C65 22 100 24 130 38" stroke="#1E3A8A" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M95 14C105 18 115 16 125 12" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="138" cy="18" r="1.5" fill="#1E3A8A"/>
              </svg>
              <div style={{borderTop:'1.5px solid #111827', paddingTop:'3px', fontSize:'6.5pt', fontWeight:'700'}}>توقيع الفني المعتمد</div>
              <div style={{fontSize:'6pt', color:'#6b7280', fontFamily:'IBM Plex Sans, sans-serif', marginTop:'1px'}}>AUD-9482-KSA</div>
            </div>

            {/* Official Stamp (Center) */}
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
              <OfficialAuditStamp />
              <div style={{fontSize:'6pt', color:'#6b7280', fontFamily:'IBM Plex Sans, sans-serif', fontWeight:'600'}}>{new Date().toLocaleDateString('en-GB')} — RIYADH</div>
            </div>

            {/* Customer Block */}
            <div style={{textAlign:'center', width:'185px'}}>
              <div style={{fontSize:'7.5pt', fontWeight:'900', color:'#111827'}}>{customerName || 'مسؤول المنشأة'}</div>
              <div style={{fontSize:'6pt', color:'#6b7280', marginTop:'1px'}}>مسؤول المنشأة / العميل المستلم</div>
              <CustomerDigitalSignature name={customerName} />
              <div style={{borderTop:'1.5px solid #111827', paddingTop:'3px', fontSize:'6.5pt', fontWeight:'700', marginTop:'2px'}}>توقيع واستلام العميل</div>
            </div>

          </div>

          {/* ═══ FOOTER ═══ */}
          <div style={{background:'#f9fafb', borderTop:'1px solid #e5e7eb', padding:'3px 14px', fontSize:'5.5pt', color:'#9ca3af', display:'flex', justifyContent:'space-between'}}>
            <span>وثيقة صادرة آلياً عبر منصة {appName} | هيئة تنظيم المياه والكهرباء (WERA) | المؤسسة العامة للاتصالات وتقنية المعلومات — جميع الحقوق محفوظة</span>
            <span style={{fontFamily:'IBM Plex Sans, sans-serif', fontWeight:'700', color:'#6b7280'}}>{reportNumber}</span>
          </div>

        </div>
      );
    }

`;

const newHtml = beforeA4 + newA4Component + afterA4;
fs.writeFileSync('C:/Users/Ahmad/.gemini/antigravity/scratch/wateerah/index.html', newHtml, 'utf8');
console.log('Done! File written successfully. Length:', newHtml.length);
