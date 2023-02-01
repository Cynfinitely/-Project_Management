import React from "react";

import "./style/footer.css";

const footer = () => {
  return (
    <div className="">
      <footer className="footer">
        <div className="flex flex-row bg-slate-200">
          <div className="basis-1/5">
            <div className="pt-6 text-center">LOGO</div>
          </div>
          <div className="basis-1/5">
            <div className="pt-6 pb-4 font-bold">Products</div>
            <div className="pb-4">
              <p>
                <a href="">Jira Software</a>
              </p>
              <p>
                <a href="">Jira Align</a>
              </p>
              <p>
                <a href="">Jira Service Management</a>
              </p>
            </div>
            <div className="text-blue-600">
              <a href="">View all Products</a>
            </div>
          </div>
          <div className="basis-1/5">
            <div className="pt-6 pb-4 font-bold">Resources</div>

            <div className="pb-4">
              <p>
                <a href="">Technical support</a>
              </p>
              <p>
                <a href="">Purchasing & licensing</a>
              </p>
              <p>
                <a href="">Community</a>
              </p>
            </div>

            <div className="pb-8 text-blue-600">
              <a href="">Create support ticket</a>
            </div>
          </div>
          <div className="basis-1/5">
            <div className="pt-6 pb-4 font-bold">Expand & Learn</div>
            <div className="pb-4">
              <p>
                <a href="">Partners</a>
              </p>
              <p>
                <a href="">Training & Certification</a>
              </p>
              <p>
                <a href="">Documentation</a>
              </p>

            </div>
            <div className="pb-8 text-blue-600">
              <a href="">View all resources</a>
            </div>
          </div>
          <div className="basis-1/5">
            <div className="pt-6 pb-4 font-bold">About Company</div>
            <div className="pb-4">
              <p>
                <a href="">Company</a>
              </p>
              <p>
                <a href="">Careers</a>
              </p>
              <p>
                <a href="">Events</a>
              </p>

            </div>
            <div className="pb-8 text-blue-600">
              <a href="">Contact us</a>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-slate-300 border-t-0 border-slate-500">
        <div className="flex justify-around">
          <div className="w-5/6 ">
            <div>
              <div className="flex flex-row justify-start">
                
                <p className="py-5 pr-10">
                  <a href="">Privacy Policy</a>
                </p>
                <p className="py-5 pr-10">
                  <a href="">Terms</a>
                </p>
                <p className="py-5 pr-10">
                  <a href="">Impressum</a>
                </p>
                <p className="py-5 pr-10">
                  Copyright © {new Date().getFullYear()} Company Name.
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default footer;
