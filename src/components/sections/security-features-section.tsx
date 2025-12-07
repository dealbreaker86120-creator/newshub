import Image from 'next/image';
import { Sparkles, Bot, ChevronRight } from 'lucide-react';

const CodeLine = ({
  lineNumber,
  type,
  children,
}: {
  lineNumber?: string;
  type?: 'add' | 'remove' | 'none';
  children: React.ReactNode;
}) => {
  const baseClasses = 'flex';
  let typeClasses = '';
  if (type === 'add') {
    typeClasses = 'bg-green-900/20';
  } else if (type === 'remove') {
    typeClasses = 'bg-red-900/20';
  }

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span className="w-12 select-none text-right text-muted-foreground/50 pr-4">{lineNumber}</span>
      <span className="flex-1 pr-4">{children}</span>
    </div>
  );
};

const SecurityFeaturesSection = () => {
  return (
    <section className="bg-secondary text-foreground py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Built-in application security where found means fixed</h2>
          <p className="mt-4 text-body-large text-muted-foreground">
            Use AI to find and fix vulnerabilities so your team can ship more secure software faster.
          </p>
        </div>

        <div className="mt-16 md:mt-24 relative">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-0">
             <div className="w-[800px] h-[600px] mx-auto bg-[radial-gradient(ellipse_50%_40%,_rgba(163,113,247,0.3)_0%,_transparent_80%)]"></div>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-b from-[rgba(163,113,247,0.5)] via-[rgba(121,40,202,0.3)] to-[rgba(255,75,205,0.3)] p-px max-w-6xl mx-auto">
            <div className="bg-card rounded-[15px] p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">Apply fixes in seconds.</h3>
                  <p className="mt-4 text-muted-foreground text-lg">
                    Spend less time debugging and more time building features with Copilot Autofix.
                  </p>
                </div>
                <div className="relative rounded-xl border border-border bg-[#0d1117]">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                       <div className="bg-muted-foreground/20 rounded-full h-5 w-5 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="font-semibold text-sm text-white">github-advanced-security</span>
                      <span className="text-xs text-muted-foreground bg-card px-1.5 py-0.5 rounded-full border border-border">bot</span>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-muted-foreground space-y-2">
                    <p>The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.</p>
                    <p>To fix this, we need to sanitize the input before using it in the HTTP response. One way to do this is to use the <span className="font-mono text-purple-400">escape-html</span> library, which can escape any special characters.</p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="font-mono text-sm bg-card rounded-lg border border-border overflow-hidden">
                      <div className="py-2 px-4 border-b border-border">
                        <div className="flex items-center gap-2 rounded-md text-white text-xs">
                           <Sparkles className="h-4 w-4 text-purple-400" />
                          <span>Copilot Autofix</span>
                        </div>
                      </div>
                      <div className="text-left text-xs">
                        <CodeLine lineNumber="14">
                          <code>
                            <span className="text-gray-500">app.get('/', (</span><span className="text-blue-300">req</span><span className="text-gray-500">, </span><span className="text-blue-300">res</span><span className="text-gray-500">) =&gt; &#123;</span>
                          </code>
                        </CodeLine>
                        <CodeLine lineNumber="15" type="remove">
                           <code>
                            -   <span className="text-blue-300">res</span><span className="text-gray-500">.send(`Hello $&#123;</span><span className="text-blue-300">req</span><span className="text-gray-500">.</span><span className="text-yellow-300">query</span><span className="text-gray-500">.</span><span className="text-yellow-300">name</span><span className="text-gray-500">&#125;!`);</span>
                          </code>
                        </CodeLine>
                        <CodeLine lineNumber="15" type="add">
                           <code>
                            +   <span className="text-blue-300">res</span><span className="text-gray-500">.send(`Hello $&#123;</span><span className="text-green-400">escapeHTML</span><span className="text-gray-500">(</span><span className="text-blue-300">req</span><span className="text-gray-500">.</span><span className="text-yellow-300">query</span><span className="text-gray-500">.</span><span className="text-yellow-300">name</span><span className="text-gray-500">)&#125;!`);</span>
                          </code>
                        </CodeLine>
                        <CodeLine lineNumber="16">
                          <code>
                            <span className="text-gray-500">&#125;);</span>
                          </code>
                        </CodeLine>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card rounded-xl overflow-hidden flex flex-col">
            <div className="p-8">
              <h4 className="text-xl font-semibold text-white">Security debt, solved.</h4>
              <p className="mt-2 text-muted-foreground">Leverage security campaigns and Copilot Autofix to reduce application vulnerabilities.</p>
            </div>
            <div className="mt-auto px-8 pb-8">
              <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/accordion-2-730955545f07-5.webp" alt="Campaign progress UI" width={730} height={374} className="rounded-md border border-border"/>
            </div>
          </div>
          <div className="bg-card rounded-xl overflow-hidden flex flex-col">
            <div className="p-8">
              <h4 className="text-xl font-semibold text-white">Dependencies you can depend on.</h4>
              <p className="mt-2 text-muted-foreground">Update vulnerable dependencies with supported fixes for breaking changes.</p>
            </div>
            <div className="mt-auto px-8 pb-8">
              <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/accordion-3-52ca331d22ea-6.webp" alt="Dependency list UI" width={730} height={374} className="rounded-md border border-border"/>
            </div>
          </div>
          <div className="bg-card rounded-xl overflow-hidden flex flex-col">
            <div className="p-8">
              <h4 className="text-xl font-semibold text-white">Your secrets, your business.</h4>
              <p className="mt-2 text-muted-foreground">Detect, prevent, and remediate leaked secrets across your organization.</p>
            </div>
            <div className="mt-auto px-8 pb-8">
               <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/accordion-4-a26744b70ff7-7.webp" alt="Terminal showing secret detection" width={730} height={374} className="rounded-md border border-border"/>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-8 md:gap-16 text-center max-w-4xl mx-auto">
          <div>
            <p className="text-5xl lg:text-7xl font-semibold text-white">70%</p>
            <p className="mt-2 text-muted-foreground">MTTR reduction with Copilot Autofix<sup className="text-xs">1</sup></p>
          </div>
          <div>
            <p className="text-5xl lg:text-7xl font-semibold text-white">8.3M</p>
            <p className="mt-2 text-muted-foreground">secret leaks stopped in the past 12 months with push protection<sup className="text-xs">1</sup></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeaturesSection;