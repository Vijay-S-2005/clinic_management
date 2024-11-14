"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/sidebar";
import { useRouter } from "next/navigation";

export default function TokenList() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchToken, setSearchToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  // Static data to display tokens
  const [tokens, setTokens] = useState([
    {
      token_id: 1,
      tokenNumber: "T-001",
      patientName: "John Doe",
      visitDate: "2023-11-10",
      doctorAssigned: "Dr. Smith",
      called: false,
    },
    {
      token_id: 2,
      tokenNumber: "T-002",
      patientName: "Jane Smith",
      visitDate: "2023-11-11",
      doctorAssigned: "Dr. Brown",
      called: false,
    },
    // Add other tokens here...
  ]);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchTokenChange = (e) => {
    setSearchToken(e.target.value);
    setCurrentPage(1);
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.patientName.toLowerCase().includes(searchName.toLowerCase()) &&
      token.tokenNumber.includes(searchToken)
  );

  const totalResults = filteredTokens.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentTokens = filteredTokens.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleCallToken = (tokenId) => {
    // Mark the token as called
    setTokens(
      tokens.map((token) =>
        token.token_id === tokenId ? { ...token, called: true } : token
      )
    );
  };

  const handleConsult = (tokenId) => {
    // Redirect to the consult page for the specific token
    router.push(`/consultDoctor/${tokenId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            Patient Tokens ({totalResults})
          </h2>
          <p className="mb-4 text-gray-600">
            List of tokens assigned to patients.
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by Patient Name..."
            className="p-2 border border-gray-300 rounded w-1/2"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <input
            type="text"
            placeholder="Search by Token Number..."
            className="p-2 border border-gray-300 rounded w-1/2"
            value={searchToken}
            onChange={handleSearchTokenChange}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 text-left">Token Number</th>
                <th className="p-4 text-left">Patient Name</th>
                <th className="p-4 text-left">Visit Date</th>
                <th className="p-4 text-left">Doctor Assigned</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTokens.map((token) => (
                <tr
                  key={token.token_id}
                  className={`border-t hover:bg-gray-100 ${
                    token.called ? "bg-green-100" : ""
                  }`}
                >
                  <td className="p-4">{token.tokenNumber}</td>
                  <td className="p-4">{token.patientName}</td>
                  <td className="p-4">
                    {new Date(token.visitDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-4">{token.doctorAssigned}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleCallToken(token.token_id)}
                      className="text-yellow-500 hover:underline mr-2"
                      disabled={token.called}
                    >
                      {token.called ? "Called" : "Call Token"}
                    </button>
                    {token.called && (
                      <button
                        onClick={() => handleConsult(token.token_id)}
                        className="text-blue-500 hover:underline"
                      >
                        Consult
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {(currentPage - 1) * resultsPerPage + 1} -{" "}
            {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
            {totalResults} results
          </span>
          <div className="space-x-2">
            <button
              className="p-2 border border-gray-300 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>Page {String(currentPage).padStart(2, "0")}</span>
            <button
              className="p-2 border border-gray-300 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
