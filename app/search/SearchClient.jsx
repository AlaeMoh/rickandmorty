"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import "../styles/search.css";
import Image from 'next/image';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  if (!query) {
    return (
      <Container className="py-5 text-center">
        <h2>Search for characters</h2>
        <p className="text-white">
          Try searching for &quot;Rick&quot;, &quot;Morty&quot;, or &quot;Smith&quot;
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-4 flex-grow-1">
      <h4 className="mb-4 text-center pb-3 pt-3 title1">
        Results for &quot;{query}&quot; 
        {results.length > 0 && (
          <span className="text-white fs-6"> ({results.length} found)</span>
        )}
      </h4>

      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : results.length === 0 ? (
        <div className="alert alert-info">
          No characters found. Try a different name.
        </div>
      ) : (
        <>
          <div className="row g-4">
            {results.map((character) => (
              <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div 
                  className="card h-100 p-3 text-center shadow-sm d-flex flex-column align-items-center justify-content-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/characters/${character.id}`)}
                >
                  <span className={`ribbon ${
                    character.status === 'Alive'
                      ? 'bg-success'
                      : character.status === 'Dead'
                      ? 'bg-danger'
                      : 'bg-warning'
                  }`}>
                    {character.status}
                  </span>

                  {/* ✅ safe image render */}
                  {character.image && (
                    <Image 
                      src={character.image}
                      alt={character.name}
                      width={300} 
                      height={300}
                      className="img-fluid rounded mb-3"
                    />
                  )}

                  <h5 className='text-warning title'>{character.name}</h5>

                  <Card.Body>
                    <Card.Text className="text-white small">
                      {character.species} •• {character.gender}
                    </Card.Text>
                    <Card.Text className="small text-light">
                      📍 {character.location?.name || 'Unknown'}
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button 
              variant="outline-secondary" 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              ← Previous
            </Button>

            <span className="align-self-center text-white">
              Page {page}
            </span>

            <Button 
              variant="outline-secondary"
              disabled={results.length < 20}
              onClick={() => setPage(p => p + 1)}
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}