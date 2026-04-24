// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
  setTimeout(() => {
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
  }, 50);
});

// ===== NAVIGATION =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.section === sectionId) {
      btn.classList.add('active');
    }
  });
  
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ===== FILE UPLOAD HANDLER =====
function handleFileSelect(input) {
  const label = document.getElementById('fileLabel');
  if (input.files && input.files[0]) {
    label.textContent = `📸 Selected: ${input.files[0].name}`;
  } else {
    label.textContent = '📸 Click to upload a photo of your skin';
  }
}

// ===== INGREDIENT DATABASE =====
const ingredientDatabase = {
  acne: { cleanser: 'Salicylic Acid 2%', serum: 'Niacinamide 10% + Zinc', moisturizer: 'Oil-Free Gel with Hyaluronic Acid', sunscreen: 'SPF 50 Oil-Free', night: 'Benzoyl Peroxide 2.5%' },
  blackheads: { cleanser: 'Salicylic Acid Cleanser', serum: 'BHA 2% Liquid', moisturizer: 'Lightweight Water Cream', sunscreen: 'SPF 50 Matte', night: 'Retinol 0.5%' },
  pores: { cleanser: 'Foaming Cleanser with Niacinamide', serum: 'Niacinamide 10% + Zinc', moisturizer: 'Pore-Minimizing Moisturizer', sunscreen: 'SPF 50 Mineral', night: 'AHA/BHA Peel (2x week)' },
  dryness: { cleanser: 'Hydrating Cream Cleanser', serum: 'Hyaluronic Acid 2% + B5', moisturizer: 'Rich Cream with Ceramides', sunscreen: 'SPF 30 Hydrating', night: 'Squalane Oil + Ceramide Cream' },
  spots: { cleanser: 'Vitamin C Cleanser', serum: 'Vitamin C 20% + Ferulic Acid', moisturizer: 'Brightening Cream with Niacinamide', sunscreen: 'SPF 50 PA++++', night: 'Alpha Arbutin 2% + HA' },
  wrinkles: { cleanser: 'Gentle Cream Cleanser', serum: 'Retinol 0.3% + Peptides', moisturizer: 'Peptide-Rich Cream', sunscreen: 'SPF 50 Anti-Aging', night: 'Retinol 1% + Ceramides' },
  redness: { cleanser: 'Calming Cream Cleanser', serum: 'Centella Asiatica Ampoule', moisturizer: 'Cica Repair Cream', sunscreen: 'SPF 30 Mineral', night: 'Azelaic Acid 10%' },
  dull: { cleanser: 'Glycolic Acid Cleanser', serum: 'Vitamin C + Lactic Acid', moisturizer: 'Radiance-Boosting Cream', sunscreen: 'SPF 50 Glow', night: 'AHA 7% Exfoliant' }
};

// ===== ROUTINE FORM SUBMISSION =====
document.getElementById('routineForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const gender = formData.get('gender');
  const age = formData.get('age');
  const skinType = formData.get('skintype');
  const concerns = formData.getAll('concerns');
  
  let primaryConcern = concerns.length > 0 ? concerns[0] : 'dryness';
  const ingredients = ingredientDatabase[primaryConcern] || ingredientDatabase.dryness;
  
  let routineHTML = `
    <div class="routine-result">
      <div class="routine-header">
        <h3>✨ Your Personalized Skincare Routine ✨</h3>
        <div class="routine-profile">
          <span class="profile-tag">${gender === 'male' ? '♂ Male' : gender === 'female' ? '♀ Female' : '⚥ Other'}</span>
          <span class="profile-tag">Age: ${age}</span>
          <span class="profile-tag">${skinType.charAt(0).toUpperCase() + skinType.slice(1)} Skin</span>
        </div>
        <p style="margin-bottom: 20px;"><strong>Primary Concern:</strong> ${primaryConcern.charAt(0).toUpperCase() + primaryConcern.slice(1)}</p>
      </div>
      
      <div class="routine-columns">
        <div class="routine-column">
          <h4>☀️ <span>Morning</span> Routine</h4>
          <div class="routine-step">
            <div class="step-number">Step 1</div>
            <div class="step-title">Cleanser</div>
            <div class="step-desc">${getCleanserBySkinType(skinType)}</div>
            <span class="step-ingredient">${ingredients.cleanser}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 2</div>
            <div class="step-title">Serum</div>
            <div class="step-desc">Apply to damp skin for better absorption</div>
            <span class="step-ingredient">${ingredients.serum}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 3</div>
            <div class="step-title">Moisturizer</div>
            <div class="step-desc">Lock in hydration</div>
            <span class="step-ingredient">${ingredients.moisturizer}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 4</div>
            <div class="step-title">Sunscreen</div>
            <div class="step-desc">Apply generously, reapply every 2 hours</div>
            <span class="step-ingredient">${ingredients.sunscreen}</span>
          </div>
        </div>
        
        <div class="routine-column">
          <h4>🌙 <span>Evening</span> Routine</h4>
          <div class="routine-step">
            <div class="step-number">Step 1</div>
            <div class="step-title">Double Cleanse</div>
            <div class="step-desc">Oil cleanser → Water-based cleanser</div>
            <span class="step-ingredient">${ingredients.cleanser}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 2</div>
            <div class="step-title">Treatment</div>
            <div class="step-desc">Apply to targeted areas</div>
            <span class="step-ingredient">${ingredients.night}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 3</div>
            <div class="step-title">Serum</div>
            <div class="step-desc">Hydrating and repairing</div>
            <span class="step-ingredient">${ingredients.serum}</span>
          </div>
          <div class="routine-step">
            <div class="step-number">Step 4</div>
            <div class="step-title">Night Cream</div>
            <div class="step-desc">Rich moisturizer for overnight repair</div>
            <span class="step-ingredient">${ingredients.moisturizer}</span>
          </div>
        </div>
      </div>
      
      <div class="note-box" style="margin-top: 30px;">
        🌸 <strong>Personalized Tips:</strong> ${getPersonalizedTips(skinType, primaryConcern)}
      </div>
    </div>
  `;
  
  document.getElementById('routineResult').innerHTML = routineHTML;
  document.getElementById('fileLabel').textContent = '📸 Click to upload a photo of your skin';
});

function getCleanserBySkinType(skinType) {
  const cleansers = {
    'oily': 'Foaming gel cleanser',
    'dry': 'Cream or milk cleanser',
    'combo': 'Balancing gel cleanser',
    'normal': 'Gentle foaming cleanser',
    'sensitive': 'Fragrance-free cream cleanser'
  };
  return cleansers[skinType] || 'Gentle cleanser';
}

function getPersonalizedTips(skinType, concern) {
  const tips = {
    'oily': 'Use oil-free products and blotting papers during the day.',
    'dry': 'Layer hydrating products and use a humidifier at night.',
    'combo': 'Use different products for oily and dry areas.',
    'normal': 'Maintain your routine and add antioxidants.',
    'sensitive': 'Always patch test and avoid fragrance.'
  };
  return tips[skinType] || 'Stay consistent with your routine and always wear SPF!';
}

// ===== INQUIRY FORM SUBMISSION =====
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('inquiryName').value;
  const successMessage = `
    <div style="background: var(--sage); color: white; padding: 15px 25px; border-radius: 30px; text-align: center; margin-top: 20px;">
      <h3 style="margin-bottom: 10px;">📨 Message Sent!</h3>
      <p>Thank you, ${name}! We've received your inquiry and will respond within 24 hours.</p>
      <p style="margin-top: 10px;">🌸 The Derma Care Team</p>
    </div>
  `;
  document.getElementById('inquiryResult').innerHTML = successMessage;
  this.reset();
  setTimeout(() => { document.getElementById('inquiryResult').innerHTML = ''; }, 5000);
});

// ===== SMOOTH SECTION REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tip-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});