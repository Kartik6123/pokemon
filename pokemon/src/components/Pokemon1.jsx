import React, { useState } from 'react';

function Pokemon({ id, name, img, type }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [description, setDescription] = useState('');

  // Function to fetch Pokémon description
  const fetchDescription = async (pokemonId) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
      const data = await response.json();

      // Extract and clean up descriptions
      const flavorTextEntries = data.flavor_text_entries
        .filter((entry) => entry.language.name === 'en') // Get only English descriptions
        .map(entry => entry.flavor_text.replace(/[\n\f]/g, ' ')); // Clean newlines and formattings
      // Remove duplicates and combine unique descriptions
      const uniqueDescriptions = Array.from(new Set(flavorTextEntries));
      let combinedDescription = uniqueDescriptions.join(' ').trim();

      // Find the position of the last full stop within the desired length
      const desiredLength = 300; // Set your desired length here
      let cutOffIndex = combinedDescription.lastIndexOf('.', desiredLength);

      // If there's no full stop within the length, just use the desired length
      if (cutOffIndex === -1) {
        cutOffIndex = desiredLength;
      }

      // Slice the description up to the last full stop and pad or trim to length
      let finalDescription = combinedDescription.substring(0, cutOffIndex + 1).trim();
      if (finalDescription.length > desiredLength) {
        finalDescription = finalDescription.substring(0, desiredLength); // Trim if too long
      } else {
        finalDescription = finalDescription.padEnd(desiredLength, ' '); // Pad if too short
      }

      setDescription(finalDescription || 'Description not available');
    } catch (error) {
      console.error('Error fetching description:', error);
      setDescription('Description not available');
    }
  };

  // Function to handle card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    fetchDescription(card.id);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCard(null);
    setDescription(''); // Clear description on close
  };

const style = `neumorphic-card ${type} thumb-container`;
  return (
    <>
      <div className={`${style} hover:scale-105 transform transition-transform duration-300`} onClick={() => handleCardClick({ id, name, type, img })}>
        <div className='text-sm'>
          #{id}
        </div>
        <img src={img} alt={name} className='h-52 w-52' />
        <div>
          <h3 className='capitalize font-bold'>{name}</h3>
          <div className='text-sm capitalize font-semibold'>Type = {type}</div>
        </div>
      </div>
      {selectedCard && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
          <div className={`${type} p-8 rounded-lg shadow-lg relative max-w-lg w-full z-50`}>
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className='flex'>
              <div className='flex flex-col mr-10'>
                <h2 className="text-2xl font-bold mb-4">{selectedCard.name}</h2>
                <p>Type: {selectedCard.type}</p>
                <img src={selectedCard.img} alt="" className='h-32 w-32' />
              </div>
              <div>
                <h1 className='mb-5 font-bold'>DESCRIPTION:</h1>
                <p className='mb-4 flex flex-wrap'>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Pokemon;
