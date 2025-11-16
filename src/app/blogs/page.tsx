import { redirect } from 'next/navigation';
import { DEFAULT_LANG } from '@/config/locales';

const BlogsRootRedirect = () => {
  redirect(`/${DEFAULT_LANG}/blogs`);
};

export default BlogsRootRedirect;
