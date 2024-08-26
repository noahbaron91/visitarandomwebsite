import { VisitARandomHomePage } from './VisitARandomHomePage';
import { VisitARandomPage } from './VisitARandomPage';

export function App() {
  return (
    <div>
      <h1 className='text-3xl'>
        96.55% of pages receive no organic search traffic from Google
        <br />
        Visit a random website on the internet & learn something new
      </h1>
      <div className='buttons-wrapper'>
        <VisitARandomHomePage />
        <VisitARandomPage />
      </div>
      <p>over 10,000,000 pages indexed</p>
    </div>
  );
}
