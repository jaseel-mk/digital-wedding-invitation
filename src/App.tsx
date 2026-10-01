import { useState, useCallback } from "react";
import IntroLayer from "@/components/IntroLayer";
import Navigation from "@/components/Navigation";
import Triptych from "@/components/Triptych";
import Story from "@/components/Story";
import PersonalInvitation from "@/components/PersonalInvitation";
import MeetTheCouple from "@/components/MeetTheCouple";
import WeddingTimeline from "@/components/WeddingTimeline";
import Venue from "@/components/Venue";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import GuestInfo from "@/components/GuestInfo";
import SaveTheDate from "@/components/SaveTheDate";
import Rsvp from "@/components/Rsvp";
import ClosingMoment from "@/components/ClosingMoment";
import Footer from "@/components/Footer";

function App() {
  const [siteVisible, setSiteVisible] = useState(false);

  const handleReveal = useCallback(() => {
    setSiteVisible(true);
  }, []);

  return (
    <>
      <IntroLayer onReveal={handleReveal} />
      <div id="main-site" className={siteVisible ? "visible" : ""}>
        <Navigation />
        <Triptych />
        <Story />
        <PersonalInvitation />
        <MeetTheCouple />
        <WeddingTimeline />
        <Venue />
        <Countdown />
        <Gallery />
        <GuestInfo />
        <SaveTheDate />
        <Rsvp />
        <ClosingMoment />
        <Footer />
      </div>
    </>
  );
}

export default App;
