// import { getTrip } from "../utils/dataFetch";
import Button from '@mui/material/Button';
import MediaDrawer from '../components/MediaDrawer';

interface TripProps {
    text: string
}

interface TripInt {
    id: number;
    name: string;
    year: number;
    slug: string;
    // users: User[]; // many to many
    route: string;
    // media: Media[];
    days: string; // one to many
};
// get trip object and render it throughout the trip component children

const Trip = ({ text }: TripProps): JSX.Element => {

    return (
        <>
            <p>{text} other text</p>
            <Button variant='contained' >Hello Button</Button>
            <MediaDrawer />
        </>
    )
}

export default Trip;