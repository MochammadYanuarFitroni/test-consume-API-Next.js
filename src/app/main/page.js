'use client';

import { useEffect, useState } from 'react';
import { Input, Table } from 'antd'; // Import komponen dari Ant Design
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

async function getData() {
  const response = await fetch(
    'http://universities.hipolabs.com/search?country=indonesia&name=universitas'
  );
  return response.json();
}

function filterDataBySearch(data, searchCountry, searchName) {
  return data.filter(
    (item) =>
      item.country.toLowerCase().includes(searchCountry.toLowerCase()) &&
      item.name.toLowerCase().includes(searchName.toLowerCase())
  );
}

// Fungsi untuk membuat kolom tabel
const getColumns = () => [
  {
    title: 'Nama Universitas',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Negara',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Website',
    dataIndex: 'web_pages',
    key: 'web_pages',
    render: (web_pages) => (
      <a href={web_pages[0]} target="_blank" rel="noopener noreferrer">
        {web_pages[0]}
      </a>
    ),
  },
];

export default function Main() {
  const [data, setData] = useState([]); // State untuk menyimpan data universitas
  const [searchCountry, setSearchCountry] = useState(''); // State untuk filter berdasarkan negara
  const [searchName, setSearchName] = useState(''); // State untuk filter berdasarkan nama universitas
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 5; // Jumlah item per halaman

  // Mengambil data universitas saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchDataAndRender = async () => {
      const result = await getData();
      setData(result); // Simpan data ke state
    };
    fetchDataAndRender();
  }, []); // Dependency array kosong, artinya hanya berjalan sekali

  // Fungsi untuk memperbarui tabel
  const renderTable = () => {
    const filteredData = filterDataBySearch(data, searchCountry, searchName);

    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return {
      dataSource: paginatedData,
      total: filteredData.length,
    };
  };

  const { dataSource, total } = renderTable(); // Render tabel dan dapatkan data

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Daftar Universitas di Indonesia</h1>

      {/* Input Filter */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <Input
            placeholder="Cari berdasarkan negara"
            value={searchCountry} // Menggunakan value dari state
            className="form-control"
            onChange={(e) => {
              setSearchCountry(e.target.value); // Update filter negara
              setCurrentPage(1); // Reset halaman saat filter berubah
            }} // Render tabel saat input berubah
          />
        </div>
        <div className="col-md-6 mb-2">
          <Input
            placeholder="Cari berdasarkan nama universitas"
            value={searchName} // Menggunakan value dari state
            className="form-control"
            onChange={(e) => {
              setSearchName(e.target.value); // Update filter nama universitas
              setCurrentPage(1); // Reset halaman saat filter berubah
            }} // Render tabel saat input berubah
          />
        </div>
      </div>

      {/* Tabel untuk menampilkan data */}
      <Table
        dataSource={dataSource}
        columns={getColumns()} // Mengambil kolom dari fungsi terpisah
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: total,
          onChange: (page) => setCurrentPage(page), // Handle pagination change
        }}
        rowKey="name" // Menggunakan nama universitas sebagai key untuk setiap baris
      />
    </div>
  );
}
