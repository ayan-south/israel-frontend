import Header from '../../../components/user/Header';
import img1   from '../../../assets/one.jpg';
import img2   from '../../../assets/hf2.jpg';
import img3   from '../../../assets/hf3.jpg';
import doc    from '../../../assets/visa1.jpeg';
import docu   from '../../../assets/visa2.jpeg';
import last   from '../../../assets/hf4.jpg';
import lasto  from '../../../assets/hf5.jpg';
import last1  from '../../../assets/hf6.jpg';
import Image  from 'next/image';
import './home.css';  

export const metadata = { title: 'Home - Israel Visa Immigration Services' };

export default function HomePage() {
  return (
    <div>

      {/* ══════════════════════════════
          HEADER
      ══════════════════════════════ */}
      <Header />

      {/* ══════════════════════════════
          SECTION 1 — THREE HERO IMAGES
          Reference alignment: padding = var(--home-side-pad) = 90px L&R
      ══════════════════════════════ */}
      <div className="home-img3-grid">
        <Image src={img1} alt="El Al Airlines"   width={600} height={270} className="home-img3-item" priority />
        <Image src={img2} alt="Old City Jaffa"   width={600} height={270} className="home-img3-item" priority />
        <Image src={img3} alt="Knesset Building" width={600} height={270} className="home-img3-item" priority />
      </div>

      {/* ══════════════════════════════
          SECTION 2 — INTRO CONTENT
      ══════════════════════════════ */}
      <div className="home-intro-section">
        <div className="home-wrap">
          <h2 className="home-h2">Israel visa for Indian citizens</h2>
          <p>
            Your passport must not be older than 10 years also it must be valid for at least <strong>THREE MONTHS</strong> longer
            than the intended stay. Your passport must have at least <strong>TWO BLANK PAGES</strong> to affix the visa. The Visa
            application form must be complete &amp; duly signed by the applicant.
          </p>
          <p>
            If you&apos;re travelling to Israel from India, you&apos;re in luck. This post covers everything you need to know about
            going to Israel, including if you need a Israel visa for Indians.
          </p>
          <p>
            Yes, Indian citizens need a visa to travel to Israel. Indian nationals are required to obtain a visa before entering
            Israel for tourism, business, or any other purpose.
          </p>
          <p>
            The visa allows them to stay in Israel for a specified time as approved by the Maltese authorities.
          </p>
          <p>
            It is necessary to apply for the appropriate visa category and fulfill all the requirements to obtain a visa for Israel.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 3 — TYPE OF ISRAEL VISAS
      ══════════════════════════════ */}
      <div className="home-visa-section">
        <div className="home-wrap">
          <h2 className="home-h2-left">Type of Israel Visas</h2>

          <div className="home-visa-grid">
            {/* Employment Visa */}
            <div className="home-visa-card">
              <div className="home-visa-label">Employment visa</div>
              <div className="home-visa-img-wrap">
                <Image src={doc}  alt="Employment Visa" width={400} height={220} className="home-visa-img" />
              </div>
            </div>

            {/* Visit Visa */}
            <div className="home-visa-card">
              <div className="home-visa-label">Visit Visa</div>
              <div className="home-visa-img-wrap">
                <Image src={docu} alt="Visit Visa"      width={400} height={220} className="home-visa-img" />
              </div>
            </div>
          </div>

          <ul className="home-dot-list">
            <li>Price may differ based on the residence location of the applicant</li>
            <li>Documents pickup and drop charges, photograph development charges, taxes etc. will be additional.</li>
          </ul>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 4 — FAQs + BASIC REQUIREMENTS
      ══════════════════════════════ */}
      <div className="home-faq-section">
        <div className="home-wrap">
          <h3 className="home-h3">I have an Indian passport, do I need a visa to visit Israel?</h3>
          <p>
            Yes, Indian travellers need to have a Israel Visa prior to their arrival in the country. The good news is that, with
            our online portal you can get your Israel Visa Online in just a couple of days! We have an easy 4 step application
            process and provide end-to-end assistance to ensure you get your Israel Visa in the most hassle-free manner possible.
          </p>

          <h3 className="home-h3">Do I need travel insurance to get a Israel Visa?</h3>
          <p>
            Travellers do not need to have insurance to get a Israel visa! All you need are the below mentioned documents and
            you&apos;re good to go!
          </p>

          <h3 className="home-h3">Basic Requirements to visit Israel</h3>
          <ul className="home-dot-list">
            <li>Have a valid Passport and valid Israel Visa;</li>
            <li>Be in good health;</li>
            <li>Good moral character;</li>
            <li>Be able to convince the immigration officer that you have your family, property, assets, etc. that would serve as an incentive to come back to your home country;</li>
            <li>Be able to convince the immigration officer that you will leave the country before your Israel visa expires;</li>
            <li>Have sufficient funds to support yourself in Israel and the amount depends on how long you will stay in Israel and whether you will be staying with family, friends or any paid accommodation.</li>
          </ul>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 5 — WHY CHOOSE US
      ══════════════════════════════ */}
      <div className="home-why-section">
        <div className="home-wrap">
          <h2 className="home-h2-left">Why choose us? Because we are Awesome!</h2>
          <div className="home-why-grid">
            <div className="home-why-card">
              <div className="home-why-icon">🗂️</div>
              <div className="home-why-label">Visa Services<br />for all Countries</div>
              <p>Besides Israel Visa, we also provide visa services for several other countries! So wherever your travels take you, we are your one-stop visa solution.</p>
            </div>
            <div className="home-why-card">
              <div className="home-why-icon">⏱️</div>
              <div className="home-why-label">10 years of experience<br />in Visa processing</div>
              <p>Our experts have over 40 years of experience in visa services, therefore, when you choose us, your Israel visa is in safe hands!</p>
            </div>
            <div className="home-why-card">
              <div className="home-why-icon">🌐</div>
              <div className="home-why-label">50+ Branches<br />Worldwide</div>
              <p>If you wish to come down to our branch to apply for your Israel visa, you can do so at any one of our 150+ branches! We&apos;d love to meet you and help you out!</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 6 — SECOND 3-IMAGE ROW (flag / airport / money)
      ══════════════════════════════ */}
      <div className="home-img3-grid home-img3-grid--short">
        <Image src={last}  alt="Israeli Flag"         width={500} height={200} className="home-img3-item" />
        <Image src={lasto} alt="Tel Aviv Airport"     width={500} height={200} className="home-img3-item" />
        <Image src={last1} alt="Israeli Shekel Notes" width={500} height={200} className="home-img3-item" />
      </div>

      {/* ══════════════════════════════
          SECTION 7 — TERMS & CONDITIONS
      ══════════════════════════════ */}
      <div className="home-terms-section">
        <div className="home-wrap">
          <h2 className="home-h2-left">Visa Services - Terms &amp; Conditions</h2>
          <ol className="home-num-list">
            <li>Visa application fees along with the service charge are non-refundable in all cases. Even in case of visa application rejection the entire amount is non-refundable.</li>
            <li>Visa application approval/rejection and processing time is at the sole discretion of the immigration and we do not have any control over the same.</li>
            <li>Visa applications may require more than usual working days for processing and it is completely dependent on the immigration.</li>
            <li>Immigration/our portal may ask for additional documents on a case to case basis.</li>
            <li>Prices are correct at the time of publication and are subject to change without notice.</li>
            <li>Visa applications processing will only be after the verification of all required documents and receipt of complete payment.</li>
            <li>Visas issued under visit/business/transit/tourist profession are not eligible to work in the destination country.</li>
            <li>Our portal reserves the right to refuse applications at its discretion and bears no liability for the processing time or rejection of visa applications by the immigration.</li>
            <li>Traveller or the customer has to fully bear the penalty amount in case the destination country levy any charges.</li>
            <li>Additional charges such as documents courier, photograph development, attestation etc has to be borne by the applicant.</li>
          </ol>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 8 — SIMPLE STEPS
      ══════════════════════════════ */}
      <div className="home-steps-section">
        <div className="home-wrap">
          <h2 className="home-h2-left">Simple steps to get a Israel Visa:</h2>
          <p>
            Israel Travels has been a part of more than one million travel dreams. We offer a superior, quick and hassle-free
            Israel Visa Facilitation service. With a highly professional and dedicated team of Travel visa Experts, we are here
            to cater to all your Israel Visa application requirements.
          </p>
          <p>Throughout your visa process, you will have a dedicated visa expert handling your application.</p>
          <p>Here are the steps to apply for a Israel Visa through Israel Travels:</p>
          <ol className="home-num-list">
            <li><strong>Step 1:</strong> Provide your travel details to our Visa Expert and get all your queries answered.</li>
            <li><strong>Step 2:</strong> Pay your Israel visa fee online and get your documents picked by us.</li>
            <li><strong>Step 3:</strong> Your documents will be thoroughly verified and scrutinized by our Experts and further submitted to the Embassy.</li>
            <li><strong>Step 4:</strong> Receive your Israel Visa.</li>
          </ol>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 9 — TRAVEL CHECKLIST
      ══════════════════════════════ */}
      <div className="home-checklist-section">
        <div className="home-wrap">
          <h3 className="home-h3">Travel Checklist</h3>
          <ul className="home-dot-list">
            <li>Passport;</li>
            <li>Valid Israel Visa;</li>
            <li>Confirmed return Ticket;</li>
            <li>Contact details of your relative, friend or business contact in Israel;</li>
            <li>Confirmed hotel bookings (If Any);</li>
            <li>Israel Currency and other forms of forex;</li>
            <li>An unlocked smartphone, preferably with a SIM card from India;</li>
            <li>Any additional documents required to prove your purpose of visit (especially if you are travelling on a business Visa).</li>
          </ul>

          {/* ══════════════════════════════
              SECTION 10 — WHAT TO DO WHEN YOU ARRIVE
          ══════════════════════════════ */}
          <h3 className="home-h3" style={{ marginTop: '24px' }}>What to do when you arrive in Israel</h3>
          <ul className="home-dot-list">
            <li>Keep your Declaration form in hand (provided to you on the flight);</li>
            <li>Keep all travel documents (passport, valid Israel visa, return ticket, hotel bookings etc.) ready in case the immigration officer asks to produce any document;</li>
            <li>If you are an unaccompanied minor, make sure you stay with the flight attendant who is in charge of your safety. Additionally, you must recognise the adult picking you up at the airport. If you have any doubts, you must inform the airline staff immediately.</li>
          </ul>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 11 — ISRAEL TRAVEL GUIDE
      ══════════════════════════════ */}
      <div className="home-generic-section">
        <div className="home-wrap">
          <h3 className="home-h3">Israel travel guide</h3>
          <p>
            Israel is one of the most visited travel destinations across the world. Truly depicting the spirit of contemporary
            Asia, it is a beautiful and progressive country that weaves a scintillating fusion of varied cultures, people,
            communities, lifestyles and ethnicities.
          </p>
          <p style={{ marginTop: '12px' }}>
            Travelling to this lovely island city is a delight in itself owing to its myriad sumptuous offerings as a great
            travel destination. Israel Visa is not just the license to enter just another country on the globe, but a passage
            to a complete package for a vacation, full of surprises, thrills, and luxuries.
          </p>
          <p style={{ marginTop: '12px' }}>
            Israel is a small island country with the area that&apos;s half that of Delhi but draws in more than 10 million
            people from around the world, each year! It is known for its fantastic architecture, entertainment zones and shopping
            spots which are the biggest attractions for tourists seeking some cutting-edge vacation experience. If you are a
            tourist looking to visit Israel, we are here to help you with all the information that you will need for obtaining
            Israel Visa.
          </p>
          <p style={{ marginTop: '12px' }}>
            The cosmopolitan country-city, Israel has left behind its tag of being a dull state and emerged as a vivacious city
            which is counted today, among the most modern travel destinations. Spread from east to west for 42 km and from north
            to south for 23 km, the city is among the first shipping and banking hubs of the world&apos;s economic front. Lovingly
            called as the garden city, Israel has also portrayed as a fantastic amalgamation of different cultures, ideologies,
            cuisines and architecture adopting a fresh and modern approach, still accompanying a streak of old-school charm. You
            can find an interesting mixture of Chinese, Malay, Indian and European influence in various spheres of life here.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 12 — ISRAEL FACTS AND FIGURES
      ══════════════════════════════ */}
      <div className="home-facts-section">
        <div className="home-wrap">
          <h3 className="home-h3">Israel Facts and Figures</h3>
          <div className="home-facts-table">
            <div className="home-facts-row"><span className="home-facts-label">Region:</span><span className="home-facts-val">Middle East</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Major cities :</span><span className="home-facts-val">Haifa, Be&apos;er Shava, Jerusalem</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Independence Day:</span><span className="home-facts-val">14 May</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Capital:</span><span className="home-facts-val">Tel Aviv</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Time in Israel:</span><span className="home-facts-val">IST (-) 2.30 hours</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Language:</span><span className="home-facts-val">Hebrew (official), Arabic, English</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Area:</span><span className="home-facts-val">22,072 sq. km</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Population:</span><span className="home-facts-val">7,73,000</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Currency:</span><span className="home-facts-val">Israeli Shekel (ILS)</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Main Airlines:</span><span className="home-facts-val">El AL Israel Airlines</span></div>
            <div className="home-facts-row"><span className="home-facts-label">International Airports :</span><span className="home-facts-val">Ben Gurion Airport ( TLV); Eilat Airport; Haifa Airport</span></div>
            <div className="home-facts-row"><span className="home-facts-label">Best time to visit:</span><span className="home-facts-val">April to May &amp; September to October</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}