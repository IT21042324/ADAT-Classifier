import "./synth.css";

export const Synth = () => {
  return (
    <header className="App-header bg-white">
      <div className="container mt-5">
        <div className="row mb-5">
          <div className=" col-8 mb-3">
            <p className="fs-1">
              Overcoming Data Limitations & Biases with Synthetic Image Data
            </p>
            <p className="fs-5 fw-lighter">
              We leverages advanced AI technology created by physician engineers
              to generate high-quality, diverse, synthetic healthcare images,
              setting a new standard for accuracy, diversity, and speed in
              healthcare research and diagnostics.
            </p>
          </div>
          <div className="col-4 ">
            <div className="box_case-study image1">
              <div class="sv-original-tag">original</div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center bg-gray">
          <div className=" col-8 mb-3">
            <p className="fs-3 text-center mt-5">
              Amplifying healthcare imaging for breakthroughs that matter, with
              SynthVision's AI that understands life's nuances.
            </p>
          </div>
        </div>

        <div className="row justify-content-center mt-5 mb-5">
          <div className="text-center fs-2">
            Enhancing Imaging Accuracy and Efficiency
          </div>
          <div className="col-3 mt-5">
            <div class="card">
              <div class="card-body mt-5">
                <h5 class="card-title mt-5 blue-color">Real-World Accuracy</h5>
                <p class="card-text mt-3 fs-6 fw-lighter">
                  SynthGen captures what real health conditions look like,
                  making the synthetic data more accurate.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 mt-5">
            <div class="card">
              <div class="card-body mt-5">
                <h5 class="card-title mt-5 blue-color">Bias Reduction</h5>
                <p class="card-text mt-3 fs-6 fw-lighter">
                  Generate images for rare disease presentations, rare diseases,
                  and underrepresented groups.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 mt-5">
            <div class="card">
              <div class="card-body mt-5">
                <h5 class="card-title mt-5 blue-color">Customizable Data</h5>
                <p class="card-text mt-3 fs-6 fw-lighter">
                  Adjust the data to suit your requirements, such as skin color
                  in dermatology.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 mt-5">
            <div class="card">
              <div class="card-body mt-5">
                <h5 class="card-title mt-5 blue-color">Data Ownership</h5>
                <p class="card-text mt-3 fs-6 fw-lighter">
                  You own the data outright, with no worries about privacy
                  issues, patient consent or legal hassles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-flex-start mb-5">
          <div className="col-6">
            <p className="fs-1">Proven Result: SynthGen </p>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-3">
            <div className="row justify-content-center mb-5">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title blue-color">Challenge</h5>
                  <p class="card-text mt-3 fs-6 fw-lighter mt-5">
                    You own the data outright, with no worries about privacy
                    issues, patient consent or legal hassles.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mb-5">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title blue-color">Solution</h5>
                  <p class="card-text mt-3 fs-6 fw-lighter mt-5">
                    You own the data outright, with no worries about privacy
                    issues, patient consent or legal hassles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title blue-color mb-5">Result</h5>

                <h5 class="card-title blue-color display-3 text-center">96%</h5>
                <p className="text-center">Accuracy</p>
                <p class="card-text mt-3 fs-6 fw-lighter mt-5">
                  You own the data outright, with no worries about privacy
                  issues, patient consent or legal hassles.
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="box_case-study image2">
              <div class="sv-original-tag">Synthetic</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};