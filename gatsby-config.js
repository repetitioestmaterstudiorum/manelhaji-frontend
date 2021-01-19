module.exports = {
  siteMetadata: {
    title: `Manel Haji`,
    description: `Manel Haji is an artist and engineer with a passion for drawing.`,
    author: `@repetitioestmaterstudiorum`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "lni41ttk",
        dataset: "production",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `manel-haji`,
        short_name: `mh`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/manel-icon.jpg`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
