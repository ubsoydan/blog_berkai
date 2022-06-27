import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import ProjectTabs from '@/components/ProjectTabs'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="absolute left-0 right-0">
        <ProjectTabs />
      </div>
    </>
  )
}
