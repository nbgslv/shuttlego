import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DBTable from '../../../components/Table/DBTable';
import DBTables from './tables';

function DialogConfirmDelete(props) {
  const {
    onClose,
    value: valueProp,
    open,
    ...other
  } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  function handleCancel() {
    onClose();
  }

  function handleOk() {
    onClose(value);
  }

  return (
    <Dialog
      disableBackdropClick
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContentText>Are you sure you want to delete the selected records?</DialogContentText>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} variant="outline" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

class DBTablesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.getTableData = this.getTableData.bind(this);
    this.state = {
      tableData: [],
      chosenTable: {},
      tables: [],
      open: false,
      deleteData: [],
    };
  }

  getTableData() {
    const { chosenTable } = this.state;
    const { name, columns } = chosenTable;
    let fields = [];
    columns.forEach((column) => {
      fields.push(column.field);
    });
    const data = {
      fields,
      tableName: name,
    };
    fields = fields.length === 0 ? '' : fields;
    fetch(`http://localhost:3001/api/${data.tableName}/${fields}`)
      .then(res => res.json())
      .then((items) => {
        this.setState({
          tableData: items,
        });
      })
      .catch(err => console.log(err));
  }

  handleDelete() {
    const { deleteData, chosenTable } = this.state;
    const deleteId = [];
    deleteData.forEach(row => deleteId.push(row.id));
    fetch(`http://localhost:3001/api/${chosenTable.name}/${deleteId}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({
      open: false,
    })
  }

  handleEdit(newData, oldData) {
    const { chosenTable, tableData } = this.state;
    const data = {
      fields: newData,
      tableName: chosenTable.name,
      id: oldData.id,
    };
    fetch('http://localhost:3001/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((newRow) => {
        const i = tableData.findIndex(row => row.id === oldData.id);
        tableData[i] = newRow[0];
        this.setState({
          tableData,
        });
      });
  }

  componentDidMount() {
    const { match } = this.props;
    const table = DBTables.tables.find(table => table.name === match.params.table);
    console.log(table);
    this.setState({
      chosenTable: table,
      tables: DBTables.tables,
    }, () => this.getTableData());
  }

  render() {
    const { chosenTable, tableData, open } = this.state;
    const { columns, title } = chosenTable;
    return (
      <React.Fragment>
        <DBTable
          columns={columns}
          data={tableData}
          title={title}
          options={{
            // selection: true,
            filtering: true,
          }}
          // actions=
          // {
          //   [
          //     {
          //       tooltip: 'Remove All Selected Rows',
          //       icon: 'delete',
          //       onClick: (event, data) => {
          //         this.setState({
          //           open: true,
          //           deleteData: data,
          //         })
          //       }
          //     },
          //   ]
          // }
          editable={{
            isAddable: false,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    this.handleEdit(newData, oldData);
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: () => new Promise(),
            onRowAdd: () => new Promise(),
          }}
        />
        <DialogConfirmDelete
          keepMounted
          open={open}
          onClose={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default DBTablesContainer;
