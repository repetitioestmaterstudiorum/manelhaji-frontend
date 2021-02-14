import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/contact"

const SiteNotice = () => (
  <Layout>
    <SEO title="Site Notice" />
    <h2>Site Notice</h2>
    <h3>Site Owner and Author</h3>
    <p>Manel Haji</p>
    <Contact />
    <h3>Disclaimer</h3>
    <p>
      The author reserves the right not to be responsible for the correctness,
      accuracy, timeliness, reliability and completeness of the information.
      Liability claims against the author for material or immaterial nature, are
      arising from access to, use or non-use of the information published by
      misuse of the connection or technical faults are excluded. All offers are
      non-binding. The author expressly reserves the right to change parts of
      the pages or the entire offer without prior notice, to add to, delete, or
      cease publication temporarily or permanently.
    </p>
    <h3>Liability for Links</h3>
    <p>
      References and links to third party sites are beyond our responsibility.
      We reject any responsibility for these websites. Access to and use of
      these websites shall be at the users own risk.
    </p>
    <h3>Data Privacy and Cookie Policy</h3>
    <p>
      This website uses cookies. By using the website, you agree to that. Data
      privacy policies and cookie policies of Netlify apply.
    </p>
    <h3>Copyright</h3>
    <p>
      All content belongs to the website owner and you are not allowed to use
      any of it.
    </p>
  </Layout>
)

export default SiteNotice
