export default function FemmesNumeriquePage() {
  const videoSrc = "/femme.mp4"; // Path to the video in the public directory

  return (
    <div className="dev-page" style={{ padding: '100px 20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 className="dev-title" style={{ marginBottom: '20px' }}>Les Femmes dans le Numérique</h1>
      <div style={{ width: '100%', maxWidth: '960px', aspectRatio: '16 / 9', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <video
          src={videoSrc}
          width="100%"
          height="100%"
          autoPlay
          loop
          muted // Muted is often required for autoplay to work in modern browsers
          controls
          playsInline // Important for autoplay on iOS
          style={{ border: 0 }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
