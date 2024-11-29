import { getApiDocs } from '@/app/api-docs/swagger';
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
  const spec = await getApiDocs();
  return spec ? <ReactSwagger spec={spec} /> : null;
}
