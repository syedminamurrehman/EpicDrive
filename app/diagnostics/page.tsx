import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function DiagnosticsPage() {
    const envStatus = {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        urlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
        keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10),
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
        isStripeKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('sb_'),
        isJwtKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('eyJ'),
    };

    let dbTest = { success: false, message: 'Not started', dataCount: 0 };
    try {
        const { data, count, error } = await supabase.from('cars').select('*', { count: 'exact', head: true });
        if (error) {
            dbTest = { success: false, message: error.message, dataCount: 0 };
        } else {
            dbTest = { success: true, message: 'Connection successful', dataCount: count || 0 };
        }
    } catch (e: any) {
        dbTest = { success: false, message: e.message, dataCount: 0 };
    }

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <h1>EpicDrive Production Diagnostics</h1>
            <hr />

            <section>
                <h2>Environment Variables</h2>
                <pre style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                    {JSON.stringify(envStatus, null, 2)}
                </pre>
                {envStatus.isStripeKey && (
                    <div style={{ color: 'red', fontWeight: 'bold', padding: '10px', border: '2px solid red' }}>
                        ⚠️ WARNING: Your Anon Key looks like a STRIPE key (starts with 'sb_').
                        Supabase keys should start with 'eyJ'.
                    </div>
                )}
            </section>

            <section style={{ marginTop: '40px' }}>
                <h2>Database Connectivity Test</h2>
                <div style={{
                    backgroundColor: dbTest.success ? '#e6fffa' : '#fff5f5',
                    padding: '20px',
                    borderRadius: '8px',
                    border: `1px solid ${dbTest.success ? '#38b2ac' : '#f56565'}`
                }}>
                    <strong>Result:</strong> {dbTest.success ? '✅ SUCCESS' : '❌ FAILED'} <br />
                    <strong>Message:</strong> {dbTest.message} <br />
                    <strong>Total Cars in DB:</strong> {dbTest.dataCount}
                </div>
            </section>

            <footer style={{ marginTop: '40px', fontSize: '12px', color: '#666' }}>
                Diagnostic Page generated at: {new Date().toISOString()}
            </footer>
        </div>
    );
}
