"use client";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../public/assets/logo2.png';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchCharacter } from '../service/api'; 


export default function NavbarLayout() {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   if (!search.trim()) {
  //     setCharacters([]);
  //     setShowDropdown(false);
  //     return;
  //   }

  //   const timeoutId = setTimeout(() => {
  //     const fetchCharacters = async () => {
  //       setIsLoading(true);
  //       try {
  //         const data = await searchCharacter(search);
  //         if (data?.error) {
  //           setCharacters([]);
  //           setError(data.error);
  //         } else {
  //           setCharacters(data.results?.slice(0, 5) || []); // Limit to 5 results
  //           setError(null);
  //         }
  //         setShowDropdown(true);
  //       } catch (err) {
  //         console.error("Fetch error:", err);
  //         setError("Failed to fetch characters");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchCharacters();
  //   }, 300); // 300ms debounce

  //   return () => clearTimeout(timeoutId);
  // }, [search]);

  // 🖱️ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🎯 Handle character click → navigate to /character/[id]
  const handleCharacterClick = (id) => {
    router.push(`/character/${id}`);
    setSearch('');
    setShowDropdown(false);
  };

  return (
    <Navbar expand="lg" className="navbarColor p-2 title position-relative">
      <Container fluid className='text-white'>
        <Navbar.Brand href="/">
          <Image src={Logo} alt="logo" width="150" height="70" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 text-white" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <Nav.Link href="/characters" className='text-white'>Characters</Nav.Link>
            <Nav.Link href="/locations" className='text-white'>Locations</Nav.Link>
            <Nav.Link href="/episodes" className='text-white'>Episodes</Nav.Link>
          </Nav>

          {/* 🔍 Search Form with Dropdown */}
          <Form className="d-flex position-relative" ref={dropdownRef}>
            <Form.Control
              type="search"
              placeholder="Search characters..."
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search.trim()) {
                  e.preventDefault();
                  router.push(`/search?q=${encodeURIComponent(search.trim())}`);
                  setShowDropdown(false);
                }
              }}
            />
            <Button 
              variant="outline-success" 
              onClick={() => search.trim() && router.push(`/search?q=${encodeURIComponent(search.trim())}`)}
            >
              Search
            </Button>

            {/* 🔍 Minimal dropdown: Top 3 quick picks */}
            {showDropdown && search.trim() && characters.length > 0 && (
              <div className="position-absolute w-100 mt-1 bg-white border rounded shadow-lg" 
                  style={{ top: '100%', zIndex: 1000 }}>
                
                {characters.slice(0, 3).map((character) => (
                  <div
                    key={character.id}
                    className="d-flex align-items-center p-2 border-bottom cursor-pointer hover-bg-light"
                    onClick={() => {
                      router.push(`/character/${character.id}`);
                      setSearch('');
                      setShowDropdown(false);
                    }}
                  >
                    <Image 
                      src={character.image} 
                      alt={character.name}
                      width={32} height={32}
                      className="rounded me-2"
                    />
                    <span className="small fw-medium">{character.name}</span>
                  </div>
                ))}
                
                {/* Link to full search page */}
                <div 
                  className="p-2 text-center text-primary small cursor-pointer hover-bg-light border-top"
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
                    setShowDropdown(false);
                  }}
                >
                  View all results for &quot;{search}&quot; →
                </div>
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}