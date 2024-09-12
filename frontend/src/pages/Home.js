import React from 'react';
import Navigation from "../components/Navigation";
import Feed from '../components/Feed';
import Playlists from '../components/Playlists';
import Search from '../components/Search';

class Home extends React.Component {
  render() {
      const songsOnFeed = [
        {
          title: "Shape of You",
          artist: "Ed Sheeran",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Blinding Lights",
          artist: "The Weeknd",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Levitating",
          artist: "Dua Lipa",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Circles",
          artist: "Post Malone",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Don't Start Now",
          artist: "Dua Lipa",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Bad Guy",
          artist: "Billie Eilish",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Old Town Road",
          artist: "Lil Nas X",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Sunflower",
          artist: "Post Malone, Swae Lee",
          link: "www.examplelink.com",
          imageUrl: "/assets/images/placeholder.png"
        }
      ];
      const usersPlaylists = [
        {
          title: "Chill Vibes",
          description: "A collection of relaxing tunes",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Workout Hits",
          description: "Energetic songs to pump you up",
          imageUrl: "/assets/images/placeholder.png"
        },
        {
          title: "Road Trip Anthems",
          description: "Perfect songs for a long drive",
          imageUrl: "/assets/images/placeholder.png"
        },
      ]

    return (
      <div>
        <h1>Home</h1>
        <Navigation />
        <Search />
        <Feed songs={ songsOnFeed } />
        <Playlists playlists={ usersPlaylists } />
      </div>
    );
  }
}

export default Home;