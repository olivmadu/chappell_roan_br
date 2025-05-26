document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("active")
      }
    })
  }

  // Album / Single / EP filters
  const filterButtons = document.querySelectorAll(".filter-btn")
  const albumItems = document.querySelectorAll(".lyrics-album")

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      const f = btn.dataset.filter
      albumItems.forEach((al) => {
        al.style.display = f === "all" || al.dataset.releaseType === f ? "block" : "none"
      })
    })
  })

  // Search box
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")
  const songItems = document.querySelectorAll(".song-item")

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim()
    albumItems.forEach((al) => (al.style.display = term ? "none" : "block"))
    songItems.forEach((s) => (s.style.display = term ? "none" : "flex"))
    if (!term) return
    songItems.forEach((s) => {
      const title = s.querySelector("h3").textContent.toLowerCase()
      if (title.includes(term)) {
        s.style.display = "flex"
        s.closest(".lyrics-album").style.display = "block"
      }
    })
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch)
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") performSearch()
    })
  }

  // Modal logic - MODIFICADO PARA PRESERVAR FORMATAÇÃO
  const viewBtns = document.querySelectorAll(".btn-view-lyrics")
  const modal = document.getElementById("lyrics-modal")
  const closeBtn = modal ? modal.querySelector(".close-modal") : null
  const tabs = modal ? modal.querySelectorAll(".lyrics-tab") : []
  const contents = modal ? modal.querySelectorAll(".lyrics-tab-content") : []
  const mTitle = document.getElementById("modal-song-title")
  const mLyrics = document.getElementById("modal-lyrics-excerpt")
  const mTrans = document.getElementById("modal-translation-excerpt")
  const mAnal = document.getElementById("modal-song-analysis")
  const mComp = document.getElementById("modal-composers")
  const mProd = document.getElementById("modal-producers")
  const mFacts = document.getElementById("song-facts-list")

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const song = btn.closest(".song-item")
      const data = song.querySelector(".song-data")

      if (!data) return

      // Define o título
      if (mTitle) {
        mTitle.textContent = song.querySelector("h3").textContent
      }

      // MUDANÇA PRINCIPAL: Usa innerHTML para preservar formatação
      const fullLyricsDiv = data.querySelector(".full-lyrics")
      if (mLyrics && fullLyricsDiv) {
        mLyrics.innerHTML = fullLyricsDiv.innerHTML
      }

      const fullTransDiv = data.querySelector(".full-translation")
      if (mTrans && fullTransDiv) {
        mTrans.innerHTML = fullTransDiv.innerHTML
      }

      // Análise e outros dados
      const analysisDiv = data.querySelector(".analysis")
      if (mAnal && analysisDiv) {
        mAnal.textContent = analysisDiv.textContent
      }

      const composersDiv = data.querySelector(".composers")
      if (mComp && composersDiv) {
        mComp.textContent = composersDiv.textContent
      }

      const producersDiv = data.querySelector(".producers")
      if (mProd && producersDiv) {
        mProd.textContent = producersDiv.textContent
      }

      // Curiosidades
      if (mFacts) {
        mFacts.innerHTML = ""
        const factsList = data.querySelector(".facts")
        if (factsList) {
          factsList.querySelectorAll("li").forEach((li) => {
            const item = document.createElement("li")
            item.textContent = li.textContent
            mFacts.appendChild(item)
          })
        }
      }

      // Mostra o modal
      if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    })
  })

  // Fechar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Modal tab switching - MELHORADO
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active de todas as abas e conteúdos
      tabs.forEach((t) => t.classList.remove("active"))
      contents.forEach((c) => c.classList.remove("active"))

      // Adiciona active na aba clicada
      this.classList.add("active")

      // Determina qual conteúdo mostrar
      const tabType = this.dataset.tab
      let targetContent

      switch (tabType) {
        case "original":
          targetContent = document.getElementById("original-lyrics")
          break
        case "traducao":
          targetContent = document.getElementById("traducao-lyrics")
          break
        case "analise":
          targetContent = document.getElementById("analise-lyrics")
          break
        default:
          targetContent = document.getElementById("original-lyrics")
      }

      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      if (emailInput) {
        const email = emailInput.value
        alert(`Obrigado por se inscrever! Em breve você receberá novidades no email: ${email}`)
        this.reset()
      }
    })
  }
})
