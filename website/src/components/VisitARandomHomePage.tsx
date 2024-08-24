export function VisitARandomHomePage() {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/v1/homepage');
      const data = await response.json();
      window.open(data.url, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Visit a random homepage</button>;
}
