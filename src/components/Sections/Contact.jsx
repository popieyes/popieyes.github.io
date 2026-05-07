
export default function Contact() {

  return (
    <section className='relative flex justify-center'>
      {/* Ghost element to fix the landing of navigation */}
      <span id="contact" className="absolute -top-60"></span>
              {/* =========================================
              CONTACT: SECURE COMMS LINK (Tear-off slip)
              ========================================= */}
          <div className="relative -top-30 w-3xl z-20 mt-8 border-t-2 border-dashed border-neutral-400 bg-neutral-200 p-6 md:p-10 shadow-lg/50">
            
            <div className="max-w-2xl mx-auto">
              <h3 className="text-center font-sans font-black uppercase tracking-widest text-xl mb-2">Internal Requisition Form</h3>
              <p className="text-center font-mono text-xs text-neutral-500 mb-10 uppercase tracking-widest">
                Direct Transmission to Subject: Santiago <br/>
                Network: Secure
              </p>

              <form 
                className="space-y-8 flex flex-col"
                onSubmit={(e) => { e.preventDefault(); console.log('Transmitting...'); }}
              >
                {/* Row: Name and Org */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label htmlFor="auth_name" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                      Authorizing Agent (Name)
                    </label>
                    <input 
                      type="text" 
                      id="auth_name"
                      required
                      className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                    />
                  </div>

                  <div className="relative group">
                    <label htmlFor="auth_org" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                      Department / Agency
                    </label>
                    <input 
                      type="text" 
                      id="auth_org"
                      className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Block */}
                <div className="relative group pt-4">
                  <label htmlFor="transmission_body" className="absolute -top-1 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                    Transmission Details
                  </label>
                  {/* 
                    Using a repeating linear gradient to create lines that look like 
                    ruled paper specifically for the textarea. 
                  */}
                  <textarea 
                    id="transmission_body"
                    rows="4"
                    required
                    style={{
                      lineHeight: '2rem',
                      backgroundImage: 'linear-gradient(transparent, transparent calc(2rem - 1px), #a3a3a3 0px)',
                      backgroundSize: '100% 2rem'
                    }}
                    className="w-full bg-transparent border-0 py-1 font-mono text-sm focus:ring-0 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="flex justify-between items-end mt-8 border-t border-neutral-400 pt-6">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase">
                    Warning: Falsifying directives is <br/> punishable under section 4.A
                  </div>
                  <button 
                    type="submit" 
                    className="bg-neutral-900 text-[#e8e6df] px-8 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 hover:text-white transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-red-600 animate-pulse rounded-full"></span>
                    Transmit Data
                  </button>
                </div>
              </form>

            </div>
          </div>
              </section>
  )
}