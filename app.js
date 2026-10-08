"use strict";

const config = window.SITE_CONFIG ?? {};
const businessName = config.businessName?.trim() || "Umesh Sharda";
const contactEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail ?? "") ? config.contactEmail : "";
const whatsappNumber = /^\d{8,15}$/.test(config.whatsappNumber ?? "") ? config.whatsappNumber : "";
const byId = (id) => document.getElementById(id);

document.querySelectorAll("[data-brand]").forEach((element) => { element.textContent = businessName; });
document.querySelectorAll("[data-brand-link]").forEach((element) => { element.setAttribute("aria-label", `${businessName} home`); });
document.title = `${businessName} — Business Growth Coaching`;
document.querySelector('meta[property="og:title"]').content = document.title;
if (config.description) {
  document.querySelector('meta[name="description"]').content = config.description;
  document.querySelector('meta[property="og:description"]').content = config.description;
}
byId("year").textContent = String(new Date().getFullYear());

// The links and FAQ remain available without JavaScript.
const menuButton = document.querySelector(".menu-toggle");
const navigation = byId("main-navigation");
menuButton.hidden = false;
navigation.dataset.collapsible = "true";
const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
};
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
});
navigation.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 781px)").addEventListener("change", closeMenu);

const startingPoints = {
  direction: {
    title: "Trade the overwhelm for a clear plan.",
    description: "We’ll map your goals, identify the biggest bottleneck, and choose a few priorities for the next 90 days. You’ll know what to work on and what can wait.",
    interest: "Strategy & clarity",
  },
  sales: {
    title: "Build a more consistent path to sales.",
    description: "We’ll look at who you serve, how you reach them, and what happens from first enquiry to repeat business. Then we’ll choose practical improvements to your sales process.",
    interest: "Systems & scaling",
  },
  systems: {
    title: "Give your business room to run without you.",
    description: "We’ll identify what only you can do and what your team can own. Simple processes, clear responsibilities, and better delegation can free you to work on the bigger picture.",
    interest: "Systems & scaling",
  },
  support: {
    title: "Make your next decision with a thinking partner.",
    description: "We’ll work through the choices in front of you, test your assumptions, and turn decisions into actions. Regular check-ins help you follow through and keep learning.",
    interest: "Ongoing coaching",
  },
};
document.querySelector(".focus-tool").hidden = false;
document.querySelectorAll('input[name="challenge"]').forEach((input) => {
  input.addEventListener("change", () => {
    const point = startingPoints[input.value];
    if (!point) return;
    byId("focus-title").textContent = point.title;
    byId("focus-description").textContent = point.description;
    byId("focus-cta").dataset.interest = point.interest;
  });
});
document.querySelectorAll("[data-interest]").forEach((link) => {
  link.addEventListener("click", () => { byId("interest").value = link.dataset.interest; });
});

if (/^\+\d{8,15}$/.test(config.phone ?? "")) {
  byId("contact-phone").href = `tel:${config.phone}`;
  byId("contact-phone").firstChild.textContent = `Call ${config.phoneDisplay || config.phone} `;
}
if (whatsappNumber) {
  const greeting = `Hello ${businessName}, I’d like to discuss business growth coaching.`;
  byId("contact-whatsapp").href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(greeting)}`;
} else {
  byId("contact-whatsapp").hidden = true;
  byId("form-note").textContent = "Create an enquiry to copy or download and share with your coach. Nothing is sent automatically.";
}
if (contactEmail) {
  byId("contact-email").textContent = contactEmail;
  byId("contact-email").href = `mailto:${contactEmail}`;
  byId("contact-email").hidden = false;
}
try {
  const bookingUrl = new URL(config.bookingUrl);
  if (bookingUrl.protocol === "https:") {
    byId("booking-link").href = bookingUrl.href;
    byId("booking-link").target = "_blank";
    byId("booking-link").rel = "noopener noreferrer";
    byId("booking-link").hidden = false;
  }
} catch { /* An optional booking link is shown only when it is configured. */ }

let enquiry = "";
const form = byId("enquiry-form");
const result = byId("enquiry-result");
form.hidden = false;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  // Native required validation accepts whitespace. Check the useful text too.
  for (const field of ["name", "message"]) {
    const input = form.elements.namedItem(field);
    if (!String(data.get(field) ?? "").trim()) {
      input.setCustomValidity("Please add a little more than spaces.");
      input.reportValidity();
      input.addEventListener("input", () => input.setCustomValidity(""), { once: true });
      return;
    }
  }
  enquiry = [
    `Hello ${businessName}, I’d like to discuss business growth coaching.`,
    "",
    `Name: ${String(data.get("name")).trim()}`,
    `Email: ${String(data.get("email")).trim()}`,
    `Business: ${String(data.get("business")).trim() || "Not provided"}`,
    `Support: ${data.get("interest")}`,
    "",
    "My biggest challenge:",
    String(data.get("message")).trim(),
  ].join("\n");
  byId("enquiry-preview").textContent = enquiry;
  byId("copy-status").textContent = "";
  if (whatsappNumber) {
    byId("whatsapp-enquiry").href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiry)}`;
    byId("whatsapp-enquiry").hidden = false;
    byId("result-description").textContent = `Open WhatsApp to review and send it to ${businessName}, or keep a copy.`;
  } else {
    byId("result-description").textContent = "Copy or download your enquiry to share with your coach.";
  }
  if (contactEmail) {
    byId("email-enquiry").href = `mailto:${contactEmail}?subject=${encodeURIComponent("Business growth coaching enquiry")}&body=${encodeURIComponent(enquiry)}`;
    byId("email-enquiry").hidden = false;
  }
  result.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
});

// Editing an enquiry hides its old draft so visitors cannot send stale details.
form.addEventListener("input", () => {
  if (!result.hidden) {
    result.hidden = true;
    enquiry = "";
  }
});

byId("copy-enquiry").addEventListener("click", async () => {
  if (!enquiry) return;
  try {
    await navigator.clipboard.writeText(enquiry);
    byId("copy-status").textContent = "Message copied. You can paste it into your conversation.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(byId("enquiry-preview"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    byId("copy-status").textContent = "Your message is selected. Use your device’s Copy command, or press Ctrl+C / ⌘C.";
  }
});
byId("download-enquiry").addEventListener("click", () => {
  if (!enquiry) return;
  const url = URL.createObjectURL(new Blob([enquiry], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "business-growth-enquiry.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
