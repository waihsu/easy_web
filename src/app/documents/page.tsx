import Navbar from "@/components/Navbar";
import React from "react";

const docs = [
  {
    title: "Getting Started",
    items: [
      {
        text: "Sign Up/Log In: Create an account or log in to get started with EasyWeb.",
      },
      {
        text: "Choose a Template: Browse our extensive library of templates and select one that suits your project.",
      },
      {
        text: "Customize Your Site: Use our drag-and-drop editor to add and arrange page order",
      },
      {
        text: "Add Functionality: Enhance your site with plugins and features such as contact forms, galleries, hero section,skills,projects,about tools.",
      },
      {
        text: "Publish Your Site: Once you are satisfied with your design, click 'Publish' to make your site live.",
      },
    ],
  },
  {
    title: "Detailed Guides",
    items: [
      {
        text: "Template Customization: Learn how to modify templates to match your vision, including changing colors, fonts, and layouts.",
      },
      {
        text: "Responsive Design Tips: Best practices for ensuring your site looks great on all devices.",
      },
      {
        text: "Content Management: How to manage and organize your site’s content effectively.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        text: "Common Issues: Solutions to frequent problems users might encounter, such as publishing errors or design inconsistencies.",
      },
      {
        text: "Contact Support: How to get in touch with our support team for more personalized assistance.",
      },
    ],
  },
];

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="container">
        {docs.map((doc, index) => (
          <div key={index}>
            <h1 className=" text-3xl font-bold">{doc.title}</h1>
            <div className=" my-6">
              {doc.items.map((item, index) => (
                <p key={index} className="ml-4 font-semibold my-3">
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
