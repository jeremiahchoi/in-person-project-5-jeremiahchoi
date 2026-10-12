import { useEffect } from 'react'
import './App.css'

function App() {
  const handleNavClick = (e) => {
    e.preventDefault()
    document.querySelector(e.currentTarget.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.querySelector('.nav-menu').classList.remove('active')
    const toggle = document.querySelector('.nav-toggle')
    toggle.classList.remove('active')
    toggle.setAttribute('aria-expanded', 'false')
  }

  const handleFilterClick = (e) => {
    const category = e.currentTarget.dataset.filter
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none'
    })
    document.querySelectorAll('.filter-btn').forEach(button => {
      const active = button === e.currentTarget
      button.classList.toggle('active', active)
      button.setAttribute('aria-pressed', String(active))
    })
  }

  const handleMobileMenuToggle = (e) => {
    const open = document.querySelector('.nav-menu').classList.toggle('active')
    e.currentTarget.classList.toggle('active', open)
    e.currentTarget.setAttribute('aria-expanded', String(open))
  }

  const validateInput = (input) => {
    const value = input.value.trim()
    let message = ''
    if (input.id === 'name' && value.length < 2) message = 'Name must be at least 2 characters'
    if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Please enter a valid email address'
    if (input.id === 'message' && value.length < 10) message = 'Message must be at least 10 characters'
    input.parentElement.querySelector('.error-message')?.remove()
    input.classList.toggle('error', Boolean(message))
    input.classList.toggle('success', !message)
    input.setAttribute('aria-invalid', String(Boolean(message)))
    input.removeAttribute('aria-describedby')
    if (message) {
      const error = document.createElement('span')
      error.className = 'error-message'
      error.id = `${input.id}-error`
      error.textContent = message
      input.parentElement.appendChild(error)
      input.setAttribute('aria-describedby', error.id)
    }
    return !message
  }

  const handleInputChange = (e) => {
    document.querySelector('#form-status').textContent = ''
    document.querySelector('#form-status').className = ''
    validateInput(e.currentTarget)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const status = document.querySelector('#form-status')
    status.textContent = ''
    status.className = ''
    const results = ['name', 'email', 'message'].map(id => validateInput(form.elements[id]))
    if (results.every(Boolean)) {
      status.textContent = 'Thank you! Your message passed validation. This demo does not send email.'
      status.className = 'success-message'
      form.reset()
      form.querySelectorAll('.success').forEach(input => input.classList.remove('success'))
    } else {
      form.querySelector('.error')?.focus()
    }
  }

  const handleScroll = () => {
    const scrollPos = window.scrollY + 100
    document.querySelectorAll('section').forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          const active = link.getAttribute('href') === `#${section.id}`
          link.classList.toggle('active', active)
          if (active) link.setAttribute('aria-current', 'location')
          else link.removeAttribute('aria-current')
        })
      }
    })
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>

    {/* Navigation Bar */}
    <nav id="navbar">
        <div className="nav-brand">
            <span>Jeremiah Choi</span>
        </div>
        <ul id="navigation-menu" className="nav-menu">
            <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
            <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
        </ul>
        {/* Mobile menu toggle (for bonus implementation) */}
        <button type="button" className="nav-toggle" aria-label="Toggle navigation" aria-controls="navigation-menu" aria-expanded="false" onClick={handleMobileMenuToggle}>
            <span></span><span></span><span></span>
        </button>
    </nav>

    {/* Hero Section */}
    <section id="home" className="hero">
        <div className="hero-content">
            <h1 className="hero-title">Jeremiah Choi</h1>
            <p className="hero-subtitle">Applied Math @ UC Berkeley | Data Science Minor</p>
            <p className="hero-tagline">Building data pipelines and backend systems. Currently seeking SWE/DS roles.</p>
            <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>View Projects</a>
                <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>Get In Touch</a>
            </div>
        </div>
    </section>

    {/* About Section */}
    <section id="about" className="section">
        <div className="container">
            <h2>About Me</h2>
            <div className="about-grid">
                <div className="about-text">
                    <p>I'm a senior at UC Berkeley studying Applied Math with a minor in Data Science. I've played basketball since I was young, I love playing piano and guitar, and I need an iced latte before I start my day. I'm currently applying to SWE and DS roles, with a small possibility of grad school.</p>
                    <div className="about-details">
                        <div className="detail-item">
                            <span className="detail-icon">📍</span>
                            <span>Berkeley, CA</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">✉️</span>
                            <a href="mailto:jeremiah@example.com">jeremiah@example.com</a>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">📱</span>
                            <span>(555) 123-4567</span>
                        </div>
                    </div>
                </div>
                <div className="about-availability">
                    <h3>Currently Available For:</h3>
                    <div className="availability-tags">
                        <span className="tag tag-available">Full-Time</span>
                        <span className="tag tag-available">Internship</span>
                        <span className="tag tag-available">Remote</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Skills Section */}
    <section id="skills" className="section section-alt">
        <div className="container">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">⚛️</span>
                        <h3 className="skill-name">React</h3>
                    </div>
                    <div className="skill-category">Frontend Framework</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
                    </div>
                    <span className="skill-percentage">90%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🎨</span>
                        <h3 className="skill-name">CSS3</h3>
                    </div>
                    <div className="skill-category">Styling</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '70%' }}></div>
                    </div>
                    <span className="skill-percentage">70%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">📱</span>
                        <h3 className="skill-name">Responsive Design</h3>
                    </div>
                    <div className="skill-category">Design</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '65%' }}></div>
                    </div>
                    <span className="skill-percentage">65%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🚀</span>
                        <h3 className="skill-name">Java</h3>
                    </div>
                    <div className="skill-category">Programming</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
                    </div>
                    <span className="skill-percentage">85%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🎯</span>
                        <h3 className="skill-name">Figma</h3>
                    </div>
                    <div className="skill-category">Design Tools</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
                    </div>
                    <span className="skill-percentage">80%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🌐</span>
                        <h3 className="skill-name">Node.js</h3>
                    </div>
                    <div className="skill-category">Backend</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{ '--skill-level': '30%' }}></div>
                    </div>
                    <span className="skill-percentage">30%</span>
                </div>
            </div>
        </div>
    </section>

    {/* Projects Section */}
    <section id="projects" className="section">
        <div className="container">
            <h2>Featured Projects</h2>
            <div className="filter-buttons">
                <button className="filter-btn active" onClick={handleFilterClick} data-filter="all">All Projects</button>
                <button className="filter-btn" onClick={handleFilterClick} data-filter="frontend">Frontend</button>
                <button className="filter-btn" onClick={handleFilterClick} data-filter="fullstack">Full-Stack</button>
                <button className="filter-btn" onClick={handleFilterClick} data-filter="design">Design</button>
                <button className="filter-btn" onClick={handleFilterClick} data-filter="webapp">Web App</button>
            </div>
            <div className="projects-grid">
                <div className="project-card featured" data-category="fullstack">
                    <div className="project-image">
                        <img src="/e-commerce-app.svg" alt="E-Commerce Platform" />
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="#" className="project-link">
                                    <span>🔗</span> Live Demo
                                </a>
                                <a href="#" className="project-link">
                                    <span>💻</span> Code
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">E-Commerce Platform</h3>
                            <span className="project-category">Full-Stack</span>
                        </div>
                        <p className="project-description">A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.</p>
                        <div className="project-tags">
                            <span className="project-tag">React</span>
                            <span className="project-tag">Node.js</span>
                            <span className="project-tag">MongoDB</span>
                            <span className="project-tag">Stripe</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="frontend">
                    <div className="project-image">
                        <img src="/weather-app.svg" alt="Weather Dashboard" />
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="#" className="project-link">
                                    <span>🔗</span> Live Demo
                                </a>
                                <a href="#" className="project-link">
                                    <span>💻</span> Code
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Weather Dashboard</h3>
                            <span className="project-category">Frontend</span>
                        </div>
                        <p className="project-description">Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.</p>
                        <div className="project-tags">
                            <span className="project-tag">JavaScript</span>
                            <span className="project-tag">CSS3</span>
                            <span className="project-tag">API</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="webapp">
                    <div className="project-image">
                        <img src="/task-manager.svg" alt="Task Management App" />
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="#" className="project-link">
                                    <span>🔗</span> Live Demo
                                </a>
                                <a href="#" className="project-link">
                                    <span>💻</span> Code
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Task Management App</h3>
                            <span className="project-category">Web App</span>
                        </div>
                        <p className="project-description">Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.</p>
                        <div className="project-tags">
                            <span className="project-tag">React</span>
                            <span className="project-tag">TypeScript</span>
                            <span className="project-tag">Firebase</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="design">
                    <div className="project-image">
                        <img src="/portfolio-site.svg" alt="Portfolio Website" />
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="#" className="project-link">
                                    <span>🔗</span> Live Demo
                                </a>
                                <a href="#" className="project-link">
                                    <span>💻</span> Code
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Creative Portfolio</h3>
                            <span className="project-category">Design</span>
                        </div>
                        <p className="project-description">Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.</p>
                        <div className="project-tags">
                            <span className="project-tag">HTML5</span>
                            <span className="project-tag">CSS3</span>
                            <span className="project-tag">GSAP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="section section-alt">
        <div className="container">
            <h2>Get In Touch</h2>
            <div className="contact-content">
                <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

                <form id="contact-form" className="contact-form" noValidate onSubmit={handleFormSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" onChange={handleInputChange} name="name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" onChange={handleInputChange} name="email" required />
                        </div>

                        <div className="form-group form-group-full">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" />
                        </div>

                        <div className="form-group form-group-full">
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" onChange={handleInputChange} name="message" rows="5" required></textarea>
                        </div>

                        <div className="form-group form-group-full">
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </div>
                    </div>
                    <p id="form-status" role="status" aria-live="polite"></p>
                </form>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <p>&copy; 2026 Jeremiah Choi. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" className="social-link">GitHub</a>
                    <a href="#" className="social-link">LinkedIn</a>
                    <a href="#" className="social-link">Twitter</a>
                    <a href="#" className="social-link">Dribbble</a>
                </div>
            </div>
        </div>
    </footer>


    </>
  )
}

export default App
