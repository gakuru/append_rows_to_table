import React from "react";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [
        {
          month: "February, 2018",
          grossAmount: 10000,
          paidToDate: 3000,
          balance: 7000,
          count: 2
        },
        {
          month: "January, 2018",
          grossAmount: 11000,
          paidToDate: 2000,
          balance: 9000,
          count: 4
        }
      ],
      appendDetails: false
    };
    this.records = [];
  }

  renderTable() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross Amount</th>
              <th>Paid To Date</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRow()}</tbody>
        </table>
      </div>
    );
  }

  renderRow() {
    const { records } = this.state;
    if (records) {
      return records.map((record, i) => {
        if (!this.state.appendDetails) {
          if (record.month) {
            return (
              <tr key={++i}>
                <td>{record.month}</td>
                <td>{record.grossAmount}</td>
                <td>{record.paidToDate}</td>
                <td>{record.balance}</td>
                <td
                  className="btn btn-link"
                  onClick={() => this.renderDetails(record.month)}
                >{`From ${record.count} entr${
                  record.count > 1 ? "ies" : "y"
                }`}</td>
              </tr>
            );
          }
        } else {
          return (
            <tr>
              <td colSpan="5">{this._renderDetails()}</td>
            </tr>
          );
        }
      });
    }
  }

  renderDetails(month) {
    this.records = this.state.records;

    var remain = this.records.filter(record => {
      return record.month === month;
    });

    this.setState({ appendDetails: true });

    this.setState({ records: remain });
  }

  _renderDetails() {
    if (this.state.appendDetails) {
      const { records } = this.state;
      var record = records[0];
      console.info(records);
      return (
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="text-left">{record.month}</div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="text-right">
                  <span
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.restoreTable()}
                  >
                    &#10008;
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            Append {record.count} rows
          </div>
        </div>
      );
    }
  }

  restoreTable() {
    this.setState({ appendDetails: false });
    var records = this.records;
    // make async call to get table data

    this.setState({ records: records });
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default Hello;
