import React from 'react';
import AgGridSample from 'ag-grid-sample';
import { Button } from 'platform-common-ui';

class AppComponent extends React.Component {
    render() {
        return (<div>
            <AgGridSample />
            <Button
                onClick={() => {
                    alert('Button clicked!'); // eslint-disable-line no-alert
                }}
            >
                Button Label
            </Button>
        </div>);
    }
}

export default AppComponent;
