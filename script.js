const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const backTop = document.getElementById("backTop");
const bookingForm = document.getElementById("bookingForm");
const destinationSelect = document.querySelector('select[name="destination"]');

function closeMenu(){
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
}

menuToggle.addEventListener("click",()=>{
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link=>{
  link.addEventListener("click",closeMenu);
});

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled", window.scrollY > 50);
  backTop.classList.toggle("show", window.scrollY > 600);
});

backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

function chooseDestination(destination){
  if(destinationSelect){
    [...destinationSelect.options].forEach(option=>{
      option.selected = option.textContent.trim() === destination;
    });
  }
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}

document.querySelectorAll("[data-destination]").forEach(button=>{
  button.addEventListener("click",()=>chooseDestination(button.dataset.destination));
});

bookingForm.addEventListener("submit",(event)=>{
  event.preventDefault();

  const data = new FormData(bookingForm);
  const name = data.get("name") || "";
  const phone = data.get("phone") || "";
  const email = data.get("email") || "";
  const destination = data.get("destination") || "Not specified";
  const date = data.get("date") || "Flexible";
  const travellers = data.get("travellers") || "Not specified";
  const message = data.get("message") || "No additional details";

  const text =
`Hello Elah Safari,

I would like to plan a safari.

Name: ${name}
Phone/WhatsApp: ${phone}
Email: ${email}
Destination: ${destination}
Travel date: ${date}
Travellers: ${travellers}

Trip details:
${message}

Please send me the available itinerary and quotation. Thank you.`;

  window.open("https://wa.me/254740677858?text=" + encodeURIComponent(text), "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".safari-card,.destination-card,.feature,.gallery-item,.contact-card").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});
