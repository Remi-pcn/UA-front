import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchItems } from '../../modules/items';
import { Button, Input, Table } from "../../components/UI";

const columns = [
  { key: 'name', title: 'Nom' },
  { key: 'left', title: 'Restant' },
];

const Stocks = () => {
  const dispatch = useDispatch();
  const [stocks, setStocks] = useState();
  // An array of numbers representing the id in the list of the stocks that were changed but not saved
  const [stocksChanged, setStocksChanged] = useState();

  useEffect(async () => {
    setStocks(await dispatch(fetchItems));
  }, []);

  console.log(stocks);

  if (!stocks) return null;

  const getRowFromItem = (item) => ({
    name: item.name,
    left: <Input type="number" value={item.left} placeholder={'---'} />,
  });

  return (
    <div>
      <h1>Stocks</h1>
      <Button>Sauvegarder</Button>
      <Table columns={columns} dataSource={stocks.map(getRowFromItem)}></Table>
    </div>
  );
};

export default Stocks;
