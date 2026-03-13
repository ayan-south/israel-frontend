import Footer from '../../../components/user/Footer';
import Header from '../../../components/user/Header';
import img1 from "../../../assets/one.jpg";
import img2 from "../../../assets/ambasy.jpg";
import img3 from "../../../assets/three.jpg";
import doc from "../../../assets/doc.jpg";
import docu from "../../../assets/docu.jpeg";
import docum from "../../../assets/docum.jpeg";
import last from "../../../assets/south.jpg";
import lasto from "../../../assets/air.jpg";
import last1 from "../../../assets/last.jpeg";
import Image from 'next/image';

export const metadata = { title: 'Home - Israel Visa Immigration Services' };

export default function HomePage() {
  return (
    <div>
      <Header />

      {/* ─── HERO IMAGES ─── */}
      <div className="pub-hero pub-content">
        <Image src={img1} alt="Israel" width={180} height={60} priority />
        <Image src={img2} alt="Israel Embassy" width={180} height={60} priority />
        <Image src={img3} alt="Israel" width={180} height={60} priority />
      </div>

      {/* ─── CONTENT: Israel visa info ─── */}
      <div className="pub-content">
        <h2>Israel visa for Indian citizens</h2>
        <p>
          Your passport must not be older than 10 years also it must be valid for at least THREE MONTHS
          longer than the intended stay. Your passport must have at least TWO BLANK PAGES to affix the
          visa. The Visa application form must be complete &amp; duly signed by the applicant.
        </p>
        <p>
          If you&apos;re travelling to Israel from India, you&apos;re in luck. This post covers everything
          you need to know about going to Israel, including if you need an Israel visa for Indians.
        </p>
        <p>
          Yes, Indian citizens need a visa to travel to Israel. Indian nationals are required to
          obtain a visa before entering Israel for tourism, business, or any other purpose.
        </p>
        <p>
          The visa allows them to stay in Israel for a specified time as approved by the Israeli authorities.
        </p>
        <p>
          It is necessary to apply for the appropriate visa category and fulfill all the requirements
          to obtain a visa for Israel.
        </p>
      </div>

      {/* ─── VISA TYPES SECTION ─── */}
      <div className="pub-section pub-content">
        <div className="pub-section-title">Type of Israel Visas</div>

        <div className="pub-visa-grid">
          <div className="pub-visa-card">
            <div className="pub-visa-card-label">Employment Visa</div>
            <div className="pub-visa-image">
              <Image src={doc} alt="Employment Visa" width={180} height={60} priority />
            </div>
          </div>
          <div className="pub-visa-card">
            <div className="pub-visa-card-label">Visit Visa</div>
            <div className="pub-visa-image">
              <Image src={docu} alt="Visit Visa" width={180} height={60} priority />
            </div>
          </div>
          <div className="pub-visa-card">
            <div className="pub-visa-card-label">Work Visa</div>
            <div className="pub-visa-image">
              <Image src={docum} alt="Work Visa" width={180} height={60} priority />
            </div>
          </div>
        </div>

        <div className="pub-content">
          <p>Price may differ based on the residence location of the applicant</p>
          <p>Documents pickup and drop charges, photograph development charges, taxes etc. will be additional.</p>

          <h3 className="pub-faq-heading">I have an Indian passport, do I need a visa to visit Israel?</h3>
          <p>
            Yes, Indian travellers need to have an Israel Visa prior to their arrival in the country.
            The good news is that, with our online portal you can track your Israel Visa application
            status in just a few minutes! We have an easy 4 step application process and provide end-to-end
            assistance to ensure you get your Israel Visa in the most hassle-free manner possible.
          </p>

          <h3 className="pub-faq-heading">Do I need travel insurance to get an Israel Visa?</h3>
          <p>
            Travellers do not need to have insurance to get an Israel visa! All you need are the
            below mentioned documents and you&apos;re good to go!
          </p>

          <br />
          <p><strong>Basic Requirements to visit Israel</strong></p>
          <ul className="pub-checklist">
            <li>Have a valid Passport and valid Israel Visa;</li>
            <li>Be in good health;</li>
            <li>Good moral character;</li>
            <li>Be able to convince the immigration officer that you have your family, property, assets, etc. that would serve as an incentive to come back to your home country;</li>
            <li>Be able to convince the immigration officer that you will leave the country before your Israel visa expires;</li>
            <li>Have sufficient funds to support yourself in Israel and the amount depends on how long you will stay in Israel and whether you will be staying with family, friends or any paid accommodation.</li>
          </ul>
        </div>
      </div>

      
      {/* ─── WHY CHOOSE US ─── */}
      <div className="pub-content pub-why-section">
        <h2 className="pub-why-title">Why choose us? Because we are Awesome!</h2>
        <div className="pub-why-grid">
          <div className="pub-why-card">
            <div className="pub-why-icon">🗂️</div>
            <div className="pub-why-label">Visa Services<br />for all Countries</div>
            <p>Besides Israel Visa, we also provide visa services for several other countries! So wherever your travels take you, we are your one-stop visa solution.</p>
          </div>
          <div className="pub-why-card">
            <div className="pub-why-icon">⏱️</div>
            <div className="pub-why-label">10 years of experience<br />in Visa processing</div>
            <p>Our experts have over 10 years of experience in visa services, therefore, when you choose us, your Israel visa is in safe hands!</p>
          </div>
          <div className="pub-why-card">
            <div className="pub-why-icon">🌐</div>
            <div className="pub-why-label">50+ Branches<br />Worldwide</div>
            <p>If you wish to come down to our branch to apply for your Israel visa, you can do so at any one of our 50+ branches! We&apos;d love to meet you and help you out!</p>
          </div>
        </div>
      </div>
      

      {/* ─── Second hero images ─── */}
      <div className="pub-content">
        <div className="pub-hero-2">
          <Image src={last} alt="Israel" width={180} height={60} priority />
          <Image src={lasto} alt="Israel Airport" width={180} height={60} priority />
          <Image src={last1} alt="Israel" width={180} height={60} priority />
        </div>
      </div>


      {/* ─── TERMS & CONDITIONS ─── */}
      <div className="pub-section pub-content">
        <p><strong>Visa Services - Terms &amp; Conditions</strong></p>
        <br />
        <ol className="pub-terms-list">
          <li>Visa application fees along with the service charge are non-refundable in all cases. Even in case of visa application rejection the entire amount is non-refundable.</li>
          <li>Visa application approval/rejection and processing time is at the sole discretion of the immigration and we do not have any control over the same.</li>
          <li>Visa applications may require more than usual working days for processing and it is completely dependent on the immigration.</li>
          <li>Our portal may ask for additional documents on a case to case basis.</li>
          <li>Prices are correct at the time of publication and are subject to change without notice.</li>
          <li>Visa applications processing will only be after the verification of all required documents and receipt of complete payment.</li>
          <li>Visas issued under visit/business/transit/tourist profession are not eligible to work in the destination country.</li>
          <li>Our portal reserves the right to refuse applications at its discretion and bears no liability for the processing time or rejection of visa applications by the immigration.</li>
          <li>Traveller or the customer has to fully bear the penalty amount in case the destination country levy any charges.</li>
          <li>Additional charges such as documents courier, photograph development, attestation etc has to be borne by the applicant.</li>
        </ol>
      </div>

      {/* ─── SIMPLE STEPS ─── */}
      <div className="pub-content pub-steps-section">
        <h2 className="pub-steps-title">Simple steps to get an Israel Visa:</h2>
        <p className="pub-steps-intro">
          Israel Travels has been a part of more than one million travel dreams. We offer a superior, quick and hassle-free
          Israel Visa Facilitation service. With a highly professional and dedicated team of Travel visa Experts, we are here
          to cater to all your Israel Visa application requirements.
        </p>
        <p className="pub-steps-intro">
          Throughout your visa process, you will have a dedicated visa expert handling your application.
        </p>
        <p className="pub-steps-intro">Here are the steps to apply for an Israel Visa through Israel Travels:</p>
        <ol className="pub-steps-list">
          <li><strong>Step 1:</strong> Provide your travel details to our Visa Expert and get all your queries answered.</li>
          <li><strong>Step 2:</strong> Pay your Israel visa fee online and get your documents picked up by us.</li>
          <li><strong>Step 3:</strong> Your documents will be thoroughly verified and scrutinized by our Experts and further submitted to the Embassy.</li>
          <li><strong>Step 4:</strong> Receive your Israel Visa.</li>
        </ol>
      </div>

      {/* ─── TRAVEL CHECKLIST ─── */}
      <div className="pub-content">
        <h3 className="pub-sub-heading">Travel Checklist</h3>
        <ul className="pub-checklist">
          <li>Passport;</li>
          <li>Valid Israel Visa;</li>
          <li>Confirmed return Ticket;</li>
          <li>Contact details of your relative, friend or business contact in Israel;</li>
          <li>Confirmed hotel bookings (If Any);</li>
          <li>Israeli Currency and other forms of forex;</li>
          <li>An unlocked smartphone, preferably with a SIM card from India;</li>
          <li>Any additional documents required to prove your purpose of visit (especially if you are travelling on a business Visa).</li>
        </ul>

        {/* ─── WHAT TO DO ON ARRIVAL ─── */}
        <h3 className="pub-sub-heading">What to do when you arrive in Israel</h3>
        <ul className="pub-checklist">
          <li>Keep your Declaration form in hand (provided to you on the flight);</li>
          <li>Keep all travel documents (passport, valid Israel visa, return ticket, hotel bookings etc.) ready in case the immigration officer asks to produce any document;</li>
          <li>If you are an unaccompanied minor, make sure you stay with the flight attendant who is in charge of your safety. Additionally, you must recognise the adult picking you up at the airport. If you have any doubts, you must inform the airline staff immediately.</li>
        </ul>

        {/* ─── ISRAEL TRAVEL GUIDE ─── */}
        <h3 className="pub-sub-heading">Israel travel guide</h3>
        <p>
          Israel is one of the most visited travel destinations across the world. Truly depicting the spirit of contemporary Asia,
          it is a beautiful and progressive country that weaves a scintillating fusion of varied cultures, people, communities,
          lifestyles and ethnicities.
        </p>
        <br />
        <p>
          Travelling to this lovely island city is a delight in itself owing to its myriad sumptuous offerings as a great travel destination.
          Israel Visa is not just the license to enter just another country on the globe, but a passage to a complete package for a vacation,
          full of surprises, thrills, and luxuries.
        </p>
        <br />
        <p>
          Israel is a small country with the area that&apos;s half that of Delhi but draws in more than 10 million people from around the world
          each year! It is known for its fantastic architecture, entertainment zones and shopping spots which are the biggest attractions for
          tourists seeking some cutting-edge vacation experience. If you are a tourist looking to visit Israel, we are here to help you with
          all the information that you will need for obtaining Israel Visa.
        </p>
        <br />
        <p>
          The cosmopolitan country-city, Israel has left behind its tag of being a dull state and emerged as a vivacious city which is counted
          today, among the most modern travel destinations. Spread from east to west for 42 km and from north to south for 23 km, the city is
          among the first shipping and banking hubs of the world&apos;s economic front. Lovingly called as the garden city, Israel has also portrayed
          as a fantastic amalgamation of different cultures, ideologies, cuisines and architecture adopting a fresh and modern approach, still
          accompanying a streak of old-school charm. You can find an interesting mixture of Chinese, Malay, Indian and European influence in
          various spheres of life here.
        </p>
      </div>

      {/* ─── ISRAEL FACTS AND FIGURES ─── */}
      <div className="pub-section pub-content" style={{ paddingTop: 0 }}>
        <div className="pub-facts-section">
          <div className="pub-facts-title">Israel Facts and Figures</div>
          <div className="pub-facts-table">
            <div className="pub-facts-row">
              <div className="pub-facts-label">Region:</div>
              <div className="pub-facts-value">Middle East (Western Asia)</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Major cities :</div>
              <div className="pub-facts-value">Haifa, Be&apos;er Sheva, Jerusalem</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Independence Day:</div>
              <div className="pub-facts-value">14 May (1948)</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Capital:</div>
              <div className="pub-facts-value">Tel Aviv</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Time in Israel:</div>
              <div className="pub-facts-value">IST (-) 2.30 hours</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Language:</div>
              <div className="pub-facts-value">Hebrew (official), Arabic, English</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Area:</div>
              <div className="pub-facts-value">20,770 sq. km</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Population:</div>
              <div className="pub-facts-value">9,800,000 (approx.)</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Currency:</div>
              <div className="pub-facts-value">Israeli New Shekel (ILS / ₪)</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Main Airlines:</div>
              <div className="pub-facts-value">El Al Israel Airlines, Arkia, Israir</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">International Airports :</div>
              <div className="pub-facts-value">Ben Gurion International Airport (TLV), Ramon Airport (ETM)</div>
            </div>
            <div className="pub-facts-row">
              <div className="pub-facts-label">Best time to visit:</div>
              <div className="pub-facts-value">March to May &amp; September to November</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}