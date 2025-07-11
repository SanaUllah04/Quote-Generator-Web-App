'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { quotes } from './quotes'; 



export default function InputWithButton() {
  const [topic, setTopic] = useState('');
  const [matchedQuotes, setMatchedQuotes] = useState<{ text: string; author: string }[]>([]);

  const handleSubmit = () => {
    const filtered = quotes
      .filter(q => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map(q => ({ text: q.text, author: q.author }));

    setMatchedQuotes(filtered.length ? filtered : [
      { text: "No quotes found for this topic.", author: "" }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold">
          Enter a Topic for your Quote
        </h1>
      </div>

      <div className="flex w-full max-w-sm items-center gap-5 px-0.5 py-0">
        <Input
          type="text"
          placeholder=""
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-96 shadow-sm text-lg placeholder:text-lg"
        />
        <Button
          type="button"
          onClick={handleSubmit}
          className="text-lg shadow-sm hover:shadow-md transition-all"
        >
          Generate Quote
        </Button>
      </div>

      <div className="w-full max-w-md space-y-4 mt-4">
        {matchedQuotes.map((quote, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow">
            <p className="font-medium text-gray-800"> {quote.text} </p>
            {quote.author && (
              <p className="text-sm text-gray-600 mt-1 italic">— {quote.author}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
