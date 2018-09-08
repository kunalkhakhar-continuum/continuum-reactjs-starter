import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';

class AgGridSample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                { headerName: 'Make', field: 'make' },
                { headerName: 'Model', field: 'model' },
                { headerName: 'Price', field: 'price' }

            ],
            rowData: [
                { make: 'Toyota', model: 'Celica', price: 35000 },
                { make: 'Ford', model: 'Mondeo', price: 32000 },
                { make: 'Porsche', model: 'Boxter', price: 72000 }
            ]
        };
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '500px', width: '600px' }}
            >
                <div style={{ height: 272, width: '100%' }} className="ag-rmm">
                    <div id="device-summary-grid" style={{ height: 272, width: '100%' }} className="rmm-ag-table-main">
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AgGridSample;
