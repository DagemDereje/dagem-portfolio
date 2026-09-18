export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: string;
  /** Featured projects get larger treatment on the homepage */
  featured: boolean;
  problem: string;
  data: string;
  methodology: string[];
  /** Only include verified, real numbers here — never invented ones */
  results: string;
  limitations: string[];
  techStack: string[];
  githubUrl: string;
  liveAppUrl?: string;
  appDescription?: string;
  previewImageSrc?: string;
  /** A single real, verified metric to surface on the card. Omit rather than approximate. */
  metricHighlight?: { label: string; value: string };
}

export const projects: Project[] = [
  {
    slug: "customer-intelligence",
    title: "Customer Intelligence Platform",
    oneLiner:
      "Segments customers from raw transaction data using RFM analysis and K-Means clustering, with automatically generated business insights.",
    category: "Data Analytics & BI",
    featured: true,
    problem:
      "Businesses sitting on transaction logs often can't easily answer: who are our best customers, who's slipping away, and what should we do about it?",
    data:
      "A 700-customer, ~18,900-transaction sample drawn from the well-known UCI 'Online Retail' dataset — real transaction records from a UK-based online gift retailer, with real-world messiness (missing IDs, cancellations, duplicates) intentionally retained so the cleaning step has genuine work to do.",
    methodology: [
      "Transparent, step-by-step data cleaning with a logged report of what was removed and why",
      "RFM (Recency, Frequency, Monetary) feature computation per customer",
      "Outlier clipping and log-transformation before K-Means clustering",
      "Cluster quality evaluated via silhouette score, with business-meaningful segment names (Champions, At Risk, Lost, etc.) applied via a documented rule table — not arbitrary cluster indices",
    ],
    results:
      "On the included demo dataset: 695 unique customers segmented into four groups (Champions, Potential Loyalists, At Risk, Lost) with a silhouette score of 0.327.",
    metricHighlight: { label: "Silhouette score", value: "0.327" },
    limitations: [
      "RFM is purely behavior-based — it doesn't explain why a customer behaves a certain way",
      "K-Means requires choosing a cluster count in advance; the silhouette comparison helps but doesn't remove the judgment call",
      "Business recommendations are heuristics based on common RFM practice, not predictions from a trained model",
    ],
    techStack: ["Python", "pandas", "scikit-learn", "Plotly", "Streamlit"],
    githubUrl: "https://github.com/DagemDereje/customer-intelligence-platform",
    liveAppUrl: "https://customer-intelligenceplatform.streamlit.app",
    appDescription:
      "Upload a transaction CSV, or use the included demo dataset, and get customer segments, RFM visualizations, and business recommendations instantly.",
  },
  
{
    slug: "drought-forecasting",
    title: "Meteorological Drought Forecasting",
    oneLiner:
      "Predicts short-term drought severity (SPI-3) from recent meteorological station data using XGBoost.",
    category: "Forecasting & Climate",
    featured: true,
    problem:
      "Drought monitoring agencies and agricultural planners need early signals of worsening dry conditions, not just after-the-fact confirmation. SPI-3, a standard drought severity index, normally requires a full 3-month window of data to compute directly — this project forecasts it ahead of that window.",
    data:
      "Monthly station-level meteorological records — temperature, relative humidity, and rainfall — spanning multiple years at a single station, with real recorded conditions rather than synthetic values.",
    methodology: [
      "Engineered lagged SPI and rainfall features (t-1, t-2, t-3) plus rolling 3-month mean/standard deviation of rainfall",
      "Standardized all numeric features before model input",
      "Trained an XGBoost regressor to predict the continuous SPI-3 value directly",
      "Wrapped the trained pipeline in an interactive Streamlit app for live predictions",
    ],
    results:
      "Model validated on held-out data; detailed error metrics are documented in the training notebook in the repository.",
    limitations: [
      "Trained on a single meteorological station; generalization to other locations is untested",
      "Assumes recent patterns are informative about the near future — breaks down around abrupt weather regime changes",
      "A portfolio/research prototype, not a validated operational early-warning system",
    ],
    techStack: ["Python", "pandas", "scikit-learn", "XGBoost", "Streamlit"],
    githubUrl: "https://github.com/DagemDereje/drought_forcasting_project",
    liveAppUrl: "https://drought-forcasting.streamlit.app",
    appDescription:
      "Enter recent temperature, humidity, and rainfall readings and get a predicted SPI-3 drought severity value in real time.",
  },
  {
    slug: "fraud-monitoring",
    title: "Real-Time Transaction Fraud Monitoring",
    oneLiner:
      "An end-to-end fraud-detection pipeline — synthetic data generation through XGBoost inference — with a live monitoring dashboard.",
    category: "Fraud Detection & Risk",
    featured: true,
    problem:
      "Financial platforms need to flag suspicious transactions in real time while keeping false-alarm rates operationally manageable. This project demonstrates the full pipeline: generation, training under severe class imbalance, threshold selection, and live-scoring inference.",
    data:
      "Synthetically generated high-volume credit-card transactions with realistic fraud patterns (high-value amounts, location mismatches, device velocity spikes) and severe class imbalance (~0.5–1% fraud rate), by design — this is disclosed clearly in the app and README rather than presented as real transaction data.",
    methodology: [
      "Stratified train/test split with scale_pos_weight to address extreme class imbalance",
      "XGBoost binary classifier evaluated on precision, recall, F1, ROC-AUC, and PR-AUC",
      "Operating threshold selected under a 2% maximum alert-rate constraint, saved alongside the model rather than defaulting to 0.5",
      "Both a REST API (FastAPI) and a real-time Streamlit dashboard call the same shared scoring module — inference logic exists in exactly one place",
    ],
    results:
      "Full precision/recall/F1/ROC-AUC/PR-AUC breakdown is shown live in the app's Model Performance tab, computed against the held-out test set.",
    limitations: [
      "Trained on synthetic, not real, transaction data — real-world fraud patterns are more varied and adversarial",
      "A portfolio/local demonstration system, not a production banking fraud platform — no authentication, persistent storage, or drift monitoring",
    ],
    techStack: ["Python", "XGBoost", "scikit-learn", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/DagemDereje/Fraud-Monitoring",
    liveAppUrl: "https://fraud-monitoring.streamlit.app",
    appDescription:
      "Watch simulated transactions scored in real time, or trigger specific fraud scenarios to see the model's probability, risk level, and reasoning.",
  },
  {
    slug: "receipt-extractor",
    title: "Receipt Data Extractor",
    oneLiner:
      "Extracts structured data — vendor, date, total, category — from photographed receipts using a fine-tuned document-understanding model.",
    category: "Document AI",
    featured: true,
    problem:
      "Manually entering receipt data for expense reports or bookkeeping is tedious and error-prone. Generic OCR alone isn't enough — it returns raw text without knowing which text is the vendor versus the date versus the total.",
    data:
      "Fine-tuned on SROIE (Scanned Receipts OCR and Information Extraction), a public benchmark dataset of real scanned receipts with labeled fields.",
    methodology: [
      "Tesseract OCR extracts raw text and word-level bounding boxes from the uploaded image",
      "A LayoutLMv3 model, fine-tuned on SROIE, performs token classification using each word's position on the page, not just its text",
      "Known vendors/keywords are matched via a rule-based layer first; unmatched receipts fall back to zero-shot classification for category",
      "Regex-based parsing handles currency and tax detection",
    ],
    results:
      "Validated through manual testing on real receipt photos — extraction holds up well on typical printed receipts. No formal held-out benchmark has been run yet.",
    limitations: [
      "Extraction quality depends on photo quality (lighting, angle, blur) since it starts from OCR",
      "The zero-shot category fallback is a general-purpose model, not fine-tuned for receipts, so it's less reliable than the core extraction model",
      "Fine-tuned specifically on SROIE-style receipts — unusual formats may not extract as reliably",
    ],
    techStack: ["Python", "PyTorch", "Transformers", "LayoutLMv3", "Tesseract OCR", "Streamlit"],
    githubUrl: "https://github.com/DagemDereje/RecieptIQ",
    liveAppUrl: "https://recieptiq.streamlit.app",
    appDescription:
      "Upload a photo of a real receipt and get structured fields — vendor, date, total, category, tax — back in seconds.",
  },
  {
    slug: "heart-disease-predictor",
    title: "Heart Disease Risk Predictor",
    oneLiner:
      "Predicts 10-year coronary heart disease risk from clinical measurements, using an XGBoost model trained on the Framingham Heart Study.",
    category: "Healthcare & Risk Prediction",
    featured: false,
    problem:
      "Early identification of elevated cardiovascular risk lets clinicians and patients act sooner. This project models 10-year CHD risk from 14 standard clinical measurements.",
    data:
      "The Framingham Heart Study dataset (4,240 samples), a long-running, widely used public cardiovascular research dataset.",
    methodology: [
      "F2-score optimization during cross-validation — deliberately prioritizing recall over precision, since a missed at-risk patient is costlier than a false alarm in a screening context",
      "IQR-based outlier handling",
      "The 'education' feature was deliberately excluded as a potentially problematic socioeconomic proxy",
      "Decision threshold selected via F2-optimization rather than a default 0.5 cutoff",
    ],
    results:
      "ROC-AUC 0.891, Recall (Sensitivity) 0.821, F2-Score 0.742, Accuracy 0.783 — reported on held-out test data.",
    metricHighlight: { label: "ROC-AUC", value: "0.891" },
    limitations: [
      "Research and educational tool only — not a substitute for professional medical advice, diagnosis, or treatment",
      "Framingham Heart Study participants are not fully representative of all populations",
      "Recall was deliberately prioritized over precision, meaning more false positives are expected by design",
    ],
    techStack: ["Python", "XGBoost", "scikit-learn", "Streamlit", "Docker"],
    githubUrl: "https://github.com/DagemDereje/heart-disease-prediction",
    liveAppUrl: "https://heart-disease-predictiond.streamlit.app",
    appDescription:
      "Enter clinical measurements (or use a preset profile) and get a real-time 10-year CHD risk estimate with a plain-language risk level.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
