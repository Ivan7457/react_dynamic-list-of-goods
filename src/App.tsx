import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll } from './api/goods';
// or
// import * as goodsAPI from './api/goods';

import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const handleGetAll = () => {
    getAll().then(data => setGoods(data));
  };

  const handleGet5First = () => {
    getAll().then(data =>
      setGoods(data.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 5)),
    );
  };

  const handleGetRedGoods = () => {
    getAll().then(data => setGoods(data.filter(dat => dat.color === 'red')));
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={handleGetAll}>
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={handleGet5First}
      >
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={handleGetRedGoods}>
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
