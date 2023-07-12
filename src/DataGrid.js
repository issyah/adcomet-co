/**
 * Table rendering component */
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

 

export default function DataGrid(props){
  const {data, header} = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
        {header && 
          header?.map((item, index) => (
            <TableCell key={index}>{item?.label}</TableCell>
          ))
        }
        </TableRow>
      </TableHead>
      <TableBody>
        {data && 
          data?.map((item,index) => (
            <TableRow key={index}>
              {header?.map((h, i) => (
                <TableCell key={i}>{h?.render ? h?.render(item[h?.id]) : item[h?.id]}</TableCell>
              ))}
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}