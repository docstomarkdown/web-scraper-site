import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { productConfig } from '@/config/product';

const metadata: Metadata = {
  title: 'Privacy Policy | Web Scraper Pro',
  description: 'Learn how Web Scraper Pro collects, uses, and protects your data.',
  keywords: ['privacy policy', 'data protection', 'GDPR'],
};

const PrivacyPolicyPage = () => {
  const markdownFilePath = path.join(process.cwd(), 'content', 'legal', 'privacy-policy.md');
  const fileContents = fs.readFileSync(markdownFilePath, 'utf8');
  const { content } = matter(fileContents);

  return (
    <div className="dark:bg-muted/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex gap-8">
          {/* Main Content */}
          <div className="flex-1 ">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-white overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 px-6 py-8">
                <h1 className="text-3xl font-heading text-slate-800">Privacy Policy</h1>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-heading text-gray-900 dark:text-gray-100 mt-2 mb-3" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="text-xl font-heading text-gray-800 dark:text-gray-200 mt-7 mb-4 pt-4 border-t border-gray-300 dark:border-gray-700"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5 mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1 pl-2" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto mb-6">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-gray-50 dark:bg-gray-700" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        {...props}
                      />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="even:bg-gray-50 dark:even:bg-gray-700/10" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-heading text-gray-900 dark:text-gray-100">Questions?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a
                      href={`mailto:${productConfig.product.supportmail}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                    >
                      {productConfig.product.supportmail}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;