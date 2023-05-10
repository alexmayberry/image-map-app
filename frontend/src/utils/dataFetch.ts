const apiUrl = process.env.REACT_APP_API_URL;

// okay, i need to define the types of data I get back from the api with an interface when i do a fetch() 

// so does that mean my types will need to reflect my entities? how do i define a type of `users` in a type `trip?

export interface Trip {
    id: number;
    name: string;
    year: number;
    slug: string;
    // users: User[]; // how do i define this?
    route: string;
    // media: Media[]; // how do i define this?
    days: string;
}

// export async function getTrip(id: number): Promise<Trip[]> {
//     try {
//         const response = await fetch(`${apiUrl}/trip`)
//         const data =  await response.json();
//         return data;
//     } catch (err) {
//         console.error(err);
//     }

//     // trying to return a dummy trip here
//     return {
//             id: 1,
//             name: "Arizona Trip",
//             year: 2023,
//             slug: "It was awesome!",
//             route: "long route",
//             days: "many days",
//             users: [],
//             media: null
//     };
// }