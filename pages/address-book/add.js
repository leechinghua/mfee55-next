import Layout1 from "@/components/layouts/layout1";

export default function ABAdd() {
  return (<Layout1 title="新增通訊錄 | 小新的網站">
    <div className="row">
        <div className="col-6">
          <div className="card">

            <div className="card-body">
              <h5 className="card-title">新增資料</h5>
              <form name="form1" onSubmit={()=>{}}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label"><span className="required">**</span> 姓名</label>
                  <input type="text" className="form-control" id="name" name="name"/>
                  <div className="form-text"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><span className="required">**</span> email</label>
                  <input type="text" className="form-control" id="email" name="email"/>
                  <div className="form-text"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">mobile</label>
                  <input type="text" className="form-control" id="mobile" name="mobile"/>
                  <div className="form-text"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">birthday</label>
                  <input type="date" className="form-control" id="birthday" name="birthday"/>
                  <div className="form-text"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">address</label>

                  <textarea className="form-control" id="address" name="address" rows="3"></textarea>
                  <div className="form-text"></div>
                </div>


                <button type="submit" className="btn btn-primary">新增</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  </Layout1>);
}
