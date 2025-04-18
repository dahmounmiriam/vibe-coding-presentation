import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const PresentationContent = ({ currentSection }) => {
  const { language } = useLanguage();
  const [activeSubSession, setActiveSubSession] = useState(0);
  return (
    <div className="overlay">
      {currentSection === 0 && (
        <div className="content">
          <h1>{translations.intro.title[language]}</h1>
          <p style={{ fontSize: '2rem', lineHeight: '1.5', marginTop: '1.5rem' }}>{translations.intro.subtitle[language]}</p>
        </div>
      )}

      {currentSection === 1 && (
        <div className="content">
          <h2>{translations.evolution.title[language]}</h2>
          <ul>
            {translations.evolution.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      )}

      {currentSection === 2 && (
        <div className="content">
          <h2>{translations.principles.title[language]}</h2>
          <ul>
            {translations.principles.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
          <div className="code-example" style={{ width: '100%' }}>
            <pre className="code">
{`${translations.principles.codeExample[language].traditional}
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

${translations.principles.codeExample[language].vibePrompt}
${translations.principles.codeExample[language].promptText}`}
            </pre>
          </div>
        </div>
      )}

      {currentSection === 3 && (
        <div className="content">
          <h2>{translations.benefits.title[language]}</h2>
          <ul>
            {translations.benefits.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      )}

      {currentSection === 4 && (
        <div className="content">
          <h2>{translations.challenges.title[language]}</h2>
          <ul>
            {translations.challenges.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      )}

      {currentSection === 5 && (
        <div className="content">
          <h2>{translations.applications.title[language]}</h2>
          <ul>
            {translations.applications.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      )}

      {currentSection === 6 && (
        <div className="content">
          <h2>{translations.demo.title[language]}</h2>
          <p style={{ fontSize: '1.8rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{translations.demo.intro[language]}</p>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <pre className="code">
{translations.demo.prompts[language].join('\n\n')}
            </pre>
          </div>
          <p style={{ fontSize: '1.8rem', lineHeight: '1.5', marginTop: '1.5rem' }}>{translations.demo.conclusion[language]}</p>
        </div>
      )}

      {currentSection === 7 && (
        <div className="content">
          <h2>{translations.future.title[language]}</h2>
          <ul>
            {translations.future.items[language].map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      )}

      {currentSection === 8 && (
        <div className="content">
          <h2>{translations.aiCodersStructure.title[language]}</h2>
          <h3>{translations.aiCodersStructure.subtitle[language]}</h3>

          {/* Sub-sessions tabs navigation */}
          <div className="tabs-container">
            <div className="tabs">
              {translations.aiCodersStructure.subSessions[language].map((subSession, index) => (
                <button
                  key={index}
                  className={`tab-button ${activeSubSession === index ? 'active' : ''}`}
                  onClick={() => setActiveSubSession(index)}
                >
                  {subSession}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="tab-content">
              {/* Sub-session 1: What's an AI Agent */}
              {activeSubSession === 0 && (
                <div className="tab-pane active">
                  <h4>{translations.aiCodersStructure.whatIsAgent.title[language]}</h4>
                  <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {translations.aiCodersStructure.whatIsAgent.description[language]}
                  </p>
                </div>
              )}

              {/* Sub-session 2: Understanding AI Agents in Coding */}
              {activeSubSession === 1 && (
                <div className="tab-pane active">
                  <h4>{translations.aiCodersStructure.understanding.title[language]}</h4>
                  <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {translations.aiCodersStructure.understanding.intro[language]}
                  </p>
                  <ul>
                    {translations.aiCodersStructure.understanding.items[language].map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Sub-session 3: Core Components */}
              {activeSubSession === 2 && (
                <div className="tab-pane active">
                  <h4>{translations.aiCodersStructure.components.title[language]}</h4>
                  <ul>
                    {translations.aiCodersStructure.components.items[language].map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Sub-session 4: Multi-Agent Systems */}
              {activeSubSession === 3 && (
                <div className="tab-pane active">
                  <h4>{translations.aiCodersStructure.multiAgent.title[language]}</h4>
                  <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {translations.aiCodersStructure.multiAgent.intro[language]}
                  </p>
                  <ul>
                    {translations.aiCodersStructure.multiAgent.items[language].map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentSection === 9 && (
        <div className="content">
          <h2>{translations.aiCodersExamples.title[language]}</h2>

          <h3>{translations.aiCodersExamples.tools.title[language]}</h3>

          <h4>{translations.aiCodersExamples.tools.extensions.title[language]}</h4>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.tools.extensions.items[language]}
          </p>

          <h4>{translations.aiCodersExamples.tools.webIDE.title[language]}</h4>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.tools.webIDE.items[language]}
          </p>

          <h4>{translations.aiCodersExamples.tools.desktopApp.title[language]}</h4>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.tools.desktopApp.items[language]}
          </p>

          <h4>{translations.aiCodersExamples.tools.generalAI.title[language]}</h4>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.tools.generalAI.items[language]}
          </p>

          <h3>{translations.aiCodersExamples.architecture.title[language]}</h3>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.architecture.items[language]}
          </p>

          <h3>{translations.aiCodersExamples.requirements.title[language]}</h3>
          <p style={{ fontSize: '1.6rem', lineHeight: '1.5', marginBottom: '1rem' }}>
            {translations.aiCodersExamples.requirements.items[language]}
          </p>
        </div>
      )}

      {currentSection === 10 && (
        <div className="content">
          <h2>{translations.bibliography.title[language]}</h2>

          <div className="bio-card">
            <div className="bio-image-container">
              <div className="placeholder-image">
                <div className="placeholder-initials">AK</div>
              </div>
            </div>
            <div className="bio-content">
              <h3>{translations.bibliography.karpathy.name[language]}</h3>
              <h4>{translations.bibliography.karpathy.title[language]}</h4>

              <p className="bio-text">
                {translations.bibliography.karpathy.bio[language]}
              </p>

              <div className="bio-achievements">
                <h5>Achievements</h5>
                <ul>
                  {translations.bibliography.karpathy.achievements[language].map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <blockquote className="bio-quote">
                {translations.bibliography.karpathy.quote[language]}
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentationContent;
