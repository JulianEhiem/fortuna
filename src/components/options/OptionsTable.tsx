import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ChangeEvent, useContext} from "react";
import {OptionsContext} from "../../App.tsx";
import {TextField} from "@mui/material";

export interface rowOptionsType {
    optionLabel: string;
    frequency: number;
}

const OptionsTable = ()=> {
    const context = useContext(OptionsContext);
    const { optionObjects, updateOptions } = context;

    const updateFrequency = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index:number) => {
        const value = e.target.value;
        const optionsCopy = [...optionObjects];
        optionsCopy[index].frequency = Number(value);
        updateOptions(optionsCopy);
    }

    const updateOptionLabel = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index:number) => {
        const value = e.target.value;
        const optionsCopy = [...optionObjects];
        optionsCopy[index].optionLabel = value;
        updateOptions(optionsCopy);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Option</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {optionObjects.map((row:rowOptionsType, index:number) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {/*{row.optionLabel}*/}
                                <TextField
                                    type={"text"}
                                    variant="standard"
                                    value={row.optionLabel}
                                    style={{width: "25ch"}}
                                    onChange={(e) => updateOptionLabel(e,index)}/>
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    type={"number"}
                                    slotProps={{htmlInput: {min:0}}}
                                    variant="standard"
                                    value={row.frequency}
                                    style={{width: "5ch"}}
                                    onChange={(e) => updateFrequency(e,index)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OptionsTable;