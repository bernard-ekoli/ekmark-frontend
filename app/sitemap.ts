import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://ekmark.ekolix.com.ng",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://ekmark.ekolix.com.ng/privacy",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://ekmark.ekolix.com.ng/terms",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ]
}