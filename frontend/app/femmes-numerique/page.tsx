export default function FemmesNumeriquePage() {
  const videoId = "1JwIWq-bLtaGUD7FSJhTufOqFCXew6D2y";
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;

  return (
    <div className="dev-page" style={{ padding: '100px 20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 className="dev-title" style={{ marginBottom: '20px' }}>Les Femmes dans le Numérique</h1>
      <div style={{ width: '100%', maxWidth: '960px', aspectRatio: '16 / 9', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
}