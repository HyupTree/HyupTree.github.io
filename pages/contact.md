---
layout: default
title: Contact
permalink: /contact/
---

<h2>📧 Contact Information</h2>
<div class="prompt-line">
    <span class="prompt">hyuptree@devlog:~$</span>
    <span class="command">cat contact.txt</span>
</div>
<div class="output">
    <p>📧 Email: {{ site.email }}</p>
    <p>🐙 GitHub: <a href="https://github.com/{{ site.social.github }}" target="_blank">github.com/{{ site.social.github }}</a></p>
    <p>💼 LinkedIn: <a href="https://linkedin.com/in/hyuptree" target="_blank">linkedin.com/in/hyuptree</a></p>
</div>

<div class="prompt-line">
    <span class="prompt">hyuptree@devlog:~$</span>
    <span class="command">echo "메시지를 보내주세요!"</span>
</div>
<div class="output">
    <p>언제든지 연락 주세요! 개발 관련 이야기나 협업 제안 환영합니다.</p>
    
    <div class="contact-form">
        <h4>💌 간단한 메시지 남기기</h4>
        <p>GitHub Issues를 통해 메시지를 남겨주세요:</p>
        <a href="https://github.com/{{ site.social.github }}/{{ site.social.github }}.github.io/issues/new" 
           class="contact-link" target="_blank">
           💬 메시지 남기기
        </a>
    </div>
</div> 