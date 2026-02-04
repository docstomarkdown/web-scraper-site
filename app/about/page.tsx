import { Metadata } from "next"
import Image from "next/image"
import { productConfig } from "@/config/product"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company, our mission, and the team behind our product.",
  keywords: [
    "about us",
    "company",
    "mission",
    "vision",
    "team",
    "values",
    "software solutions",
    "business software"
  ],
}

export default function AboutPage() {
  // Sample team data - in a real app, this could be in the config
  const team = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      bio: "Alex has over 15 years of experience in the software industry and founded the company in 2018.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jamie Chen",
      role: "CTO",
      bio: "Jamie leads our engineering team and has a background in building scalable enterprise solutions.",
      image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Sam Taylor",
      role: "Head of Product",
      bio: "Sam oversees product development and ensures we're building solutions that solve real problems.",
      image: "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jordan Riley",
      role: "Head of Customer Success",
      bio: "Jordan ensures our customers get the most out of our product and have an exceptional experience.",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]

  return (
    <div className="py-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-heading">About {productConfig.product.name}</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Get to know the company and team behind {productConfig.product.name}.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl mb-4 font-heading">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We&apos;re on a mission to transform how businesses operate by providing intuitive, powerful software solutions that solve real-world problems.
            </p>
            <h2 className="text-3xl mb-4 font-heading">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a world where technology enables businesses of all sizes to operate more efficiently, make better decisions, and achieve remarkable growth.
            </p>
          </div>
          <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Our team collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-4xl tracking-tight text-center mb-12 font-heading">Our Company Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Customer First",
                description: "Everything we do starts with our customers' needs and challenges.",
              },
              {
                title: "Innovation",
                description: "We constantly push boundaries to create better solutions.",
              },
              {
                title: "Transparency",
                description: "We believe in being open and honest in everything we do.",
              },
              {
                title: "Quality",
                description: "We're committed to excellence in our products and service.",
              },
            ].map((value, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-3xl font-heading mb-2">{value.title}</h3>
                <p className="text-lg text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-heading text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}