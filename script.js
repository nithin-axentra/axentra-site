import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

emailjs.init("yzevaxhNLSHzs1nYz");

// Navigation data with descriptions
const menuData = {
  "Why Axentra?": [
    {
      title: "Our Approach",
      desc: "We blend human expertise with automation to deliver scalable, reliable operations tailored to your growth stage."
    },
    {
      title: "Core Values",
      desc: "Integrity, agility, ownership, and continuous improvement drive everything we do."
    },
    {
      title: "Technology",
      desc: "Tech-enabled workflows, dashboards, and smart routing ensure high efficiency and visibility."
    }
  ],
  Services: [
    {
      title: "Customer Support",
      desc: "24/7 omnichannel support to keep your customers happy and reduce churn."
    },
    {
      title: "Tech Support",
      desc: "Tiered technical troubleshooting with escalation management and knowledge base integration."
    },
    {
      title: "Banking Operations",
      desc: "Secure transaction processing, reconciliation, and back-office support for financial clients."
    },
    {
      title: "Data Entry & Processing",
      desc: "Clean, accurate bulk data handling with validation and automated pipelines."
    },
    {
      title: "Lead Generation",
      desc: "Qualified pipeline creation using data-driven outreach and intent signals."
    },
    {
      title: "KYC Operations",
      desc: "Compliance-first identity verification with fraud detection safeguards."
    }
  ],
  Industries: [
    {
      title: "E-commerce",
      desc: "Fulfillment support, returns handling, and post-sale customer care."
    },
    {
      title: "Healthcare",
      desc: "HIPAA-conscious patient support, records processing, and appointment management."
    },
    {
      title: "BFSI",
      desc: "Financial services operations including onboarding, compliance, and support."
    },
    {
      title: "Real Estate",
      desc: "Lead qualification, property inquiry handling, and back-office coordination."
    },
    {
      title: "Telecom",
      desc: "Subscription support, technical assistance, and churn mitigation."
    },
    {
      title: "Insurance",
      desc: "Claims processing support, policyholder assistance, and verification workflows."
    }
  ],
  Insights: [
    {
      title: "Blog",
      desc: "Thought leadership, deep dives, and industry trends from our experts."
    },
    {
      title: "Case Studies",
      desc: "Real client stories showcasing measurable impact and transformation."
    },
    {
      title: "News",
      desc: "Updates about Axentra, product launches, and market moves."
    }
  ],
  Careers: [
    {
      title: "Join Us",
      desc: "Work with a distributed, mission-driven team pushing the boundaries of BPO."
    },
    {
      title: "Open Positions",
      desc: "See current roles across operations, tech, and leadership."
    },
    {
      title: "Culture",
      desc: "A values-first environment focused on growth, transparency, and collaboration."
    }
  ],
  Investors: [
    {
      title: "Investor Relations",
      desc: "Key metrics, governance, and strategic updates for stakeholders."
    },
    {
      title: "Financials",
      desc: "Performance summaries, reports, and financial health indicators."
    }
  ]
};

function buildNav() {
  const navMenu = document.getElementById("nav-menu");
  Object.entries(menuData).forEach(([label, items]) => {
    const li = document.createElement("li");
    li.className = "dropdown";
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = `${label} <i class="fa fa-caret-down"></i>`;
    li.appendChild(a);

    // Mega menu container
    const mega = document.createElement("div");
    mega.className = "mega-menu";
    items.forEach(item => {
      const section = document.createElement("div");
      section.className = "mega-section";
      section.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
      mega.appendChild(section);
    });
    li.appendChild(mega);
    navMenu.appendChild(li);
  });
}

function setupMobileToggle() {
  const toggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  toggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

function setupContactWidget() {
  const openBtn = document.getElementById("open-contact");
  const popup = document.getElementById("contact-popup");
  const emailBtn = document.getElementById("open-form");
  const emailModal = document.getElementById("email-modal");
  const closeModal = document.getElementById("close-modal");
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("form-status");

  openBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("active");
  });

  emailBtn?.addEventListener("click", () => {
    emailModal.classList.add("active");
    emailModal.setAttribute("aria-hidden", "false");
    popup.classList.remove("active");
    statusDiv.textContent = "";
  });

  closeModal?.addEventListener("click", () => {
    emailModal.classList.remove("active");
    emailModal.setAttribute("aria-hidden", "true");
  });

  document.addEventListener("click", (e) => {
    if (popup && !popup.contains(e.target) && e.target !== openBtn) {
      popup.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      emailModal.classList.remove("active");
      emailModal.setAttribute("aria-hidden", "true");
    }
  });

  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusDiv.style.color = "#333";
    statusDiv.textContent = "Sending...";
    const btn = this.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    const templateParams = {
      from_name: this.from_name.value,
      from_phone: this.from_phone.value,
      message: this.message.value,
    };

    emailjs.send("service_zxu1ddf", "template_0r9mzoh", templateParams)
      .then(() => {
        statusDiv.style.color = "green";
        statusDiv.textContent = "Message sent! We’ll be in touch.";
        form.reset();
        if (btn) btn.disabled = false;
        setTimeout(() => {
          emailModal.classList.remove("active");
          emailModal.setAttribute("aria-hidden", "true");
        }, 1400);
      })
      .catch((err) => {
        statusDiv.style.color = "red";
        statusDiv.textContent = "Failed to send. Please try again or email directly at axentra.cx@gmail.com";
        console.error("EmailJS error:", err);
        if (btn) btn.disabled = false;
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  setupMobileToggle();
  setupContactWidget();
});
