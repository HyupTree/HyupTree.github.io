source "https://rubygems.org"

# GitHub Pages gem (Jekyll 포함)
gem "github-pages", group: :jekyll_plugins

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# macOS에서는 필요 없음
# gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :mswin, :x64_mingw]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby] 