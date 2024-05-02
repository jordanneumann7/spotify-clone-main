
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Dropdown, InputGroup, FormControl ,Button, Row, Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import{ Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


const Client_ID = "436f5cf1d4cf4baf97032eab63f67562";
const Client_Secret = "ec6eafaac5d64c188c42c5b7537ba91b";




function App() {
  

  const[searchInput,setSearchInput] = useState("");
  const[accessToken, setAccessToken] = useState("");
  const[albums, setAlbums] = useState([]);
  //const[phpdata, setphpData] = useState([]);
  
/*
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
            setResult(data);
        },
    });
};
*/


useEffect(() => {
//Spotify API Access
  var authParameters = {
    method: 'POST',
    headers:{
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id='+Client_ID+'&client_secret='+Client_Secret

  }
 fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data=> setAccessToken(data.access_token))

}, [])



//search
async function search(){
  console.log("Search for " + searchInput);//artist

  var searchParam={
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  var artistID = await fetch('https://api.spotify.com/v1/search?q='+ searchInput +'&type=artist', searchParam)
    .then(response => response.json())
    .then(data=>{return data.artists.items[0].id})


    console.log("Artist ID is "+artistID);

    var returnedAlbum = await fetch('https://api.spotify.com/v1/artists/'+artistID+'/albums'+'?include_groups=album&market=US&limit=50',searchParam)
    .then(response => response.json())
    .then(data=>{
      //console.log(data);
      setAlbums(data.items);
    
    })
    /*
  //comment these out and the search bar will work for albums
  const response = await fetch(`http://localhost/github/spotify-clone/spotify-clone/src/inser.php?search=`+ searchInput);
  const phpData = await response.json();
  setphpData(phpData);
  console.log(phpData);
  */
}


  return (
    
    <div className="App"

      style={{
        backgroundColor: '#232b2b',
        height: '100vh',
      }}>
      <title>Spotify Clone</title>
      <h1 style={{ textAlign: 'center', fontSize: 80, color: '#90EE90', fontFamily: 'Kalam' }}>Spoti-Clone</h1>
      
      <Container>

        <Sidebar>
          <Menu>
            <SubMenu label="All Music">
              <MenuItem> Favoritees</MenuItem>
              <MenuItem>Music</MenuItem>
            </SubMenu>
            <MenuItem>Artists</MenuItem>
            <MenuItem> New Music </MenuItem>
          </Menu>
        </Sidebar>;
      </Container>
      <Container>
      <form action='http://localhost/inser.php' method='GET'>
        <InputGroup className="mb-3" size="lg" style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
          <FormControl

            placeholder="Search Music"
            type="input"
            id='search'
            onKeyPress={event => {
              if (event.key === "Enter") {
                search(event.target.value);
              }
            } }

            onChange={event => setSearchInput(event.target.value)} />
          <Button className='but' type='submit' onClick={() => { console.log("Hello"); } } style={{ backgroundColor: "black" }}>
            Search
          </Button>
        
        </InputGroup>
        </form>

    </Container>
    <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album) => {
            //console.log(album);
            return (
              <Card style={{ padding: 30, backgroundColor: '#3b444b' }}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title style={{ color: 'white', textAlign: 'center' }}>{album.name}</Card.Title>
                  <Button style={{ alignContent: 'center' }}>Add to Liked</Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
      
        </div>
  
  );
}

export default App;
