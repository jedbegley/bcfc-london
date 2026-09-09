import Script from "next/script";

export default function LeaguePage() {
  return (
    <main>
      <section style={{ padding: "60px 6%" }}>
        <p
          style={{
            color: "#df1e2f",
            fontSize: "12px",
            fontWeight: "900",
            letterSpacing: "3px",
          }}
        >
          LEAGUE EIGHT
        </p>

        <h1 style={{ fontSize: "48px", marginBottom: "30px" }}>
          League Table
        </h1>

        <div
          id="lrep216855742"
          style={{
            width: "100%",
            maxWidth: "600px",
            overflowX: "auto",
          }}
        >
          Data loading....
          <a
            href="https://fulltime.thefa.com/index.html?divisionseason=383208413"
            target="_blank"
            rel="noopener noreferrer"
          >
            View League Eight on FA Full-Time
          </a>
        </div>
      </section>

      <Script id="fulltime-league-code" strategy="afterInteractive">
        {`var lrcode = '216855742';`}
      </Script>

      <Script
        src="https://fulltime.thefa.com/client/api/cs1.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
